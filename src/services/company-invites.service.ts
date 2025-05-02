import { createCompanyInviteDao, getCompanyInvitesForUserDao } from '@/dao/company-invites.dao';
import { TCompanyInvites, TUser } from '@/db/export-schema';
import { createServiceLogger } from '@/lib/logger/logger';
import { getCompanyByIdService, isUserOwnerOrAdminService } from './company.service';
import { getUserByEmailService } from './user.service';
import { PublicError } from '@/shared/app-errors';
import { generateUUID } from '@/utils/crypting.util';
import { errorHandler } from '@/utils';
import { createUserNotificationService } from './notification-user.service';

const logger = createServiceLogger('company-invite.service');

export const getCompanyInvitesForUserService = async (
  companyId: string,
  userEmail: string,
  status?: TCompanyInvites['status']
) => {
  try {
    logger.debug({ companyId, userEmail, status }, 'Getting company invites for userEmail');

    const companyInvitesForUser = await getCompanyInvitesForUserDao(companyId, userEmail, status);

    logger.info(
      {
        companyId,
        userEmail,
        count: companyInvitesForUser.length,
      },
      'Found company invites for userEmail'
    );

    return companyInvitesForUser;
  } catch (error) {
    logger.error({
      error: errorHandler(error),
      stack: error instanceof Error ? error.stack : undefined,
      companyId,
      userEmail,
    });
    throw error;
  }
};

export const sendCompanyInviteToUserService = async (
  user: TUser,
  companyId: string,
  userEmail: string
) => {
  logger.debug({ userId: user.id, companyId, userEmail }, 'Sending invite to user');

  try {
    const [company, userExists] = await Promise.all([
      getCompanyByIdService(companyId, {
        includeMembers: true,
        inlcudeOwner: true,
      }),
      getUserByEmailService(userEmail),
    ]);

    if (!company) {
      logger.warn({ companyId }, 'Company was not found');
      throw new PublicError('Company was not found');
    }

    if (!userExists) {
      logger.warn({ userEmail }, 'User with this email does not exists');
      throw new PublicError('User with this email does not exists');
    }

    const hasPermission = isUserOwnerOrAdminService(user.id, company);
    if (!hasPermission) {
      logger.warn(
        { userId: user.id, companyId: company.id },
        'User does not have permission to send invite'
      );
      throw new PublicError('User does not have permission to send invite');
    }

    const userAllreadyMember = company.members?.some(member => member.user?.id === userExists.id);
    if (userAllreadyMember) {
      logger.warn(
        { companyId: company.id, userId: userExists.id },
        'User is already a member of this company'
      );
      throw new PublicError('User is already a member of this company');
    }

    const inviteAllreadyExists = await getCompanyInvitesForUserService(
      company.id,
      userExists.email,
      'PENDING'
    );
    if (inviteAllreadyExists.length > 0) {
      logger.warn(
        { companyId: company.id, userId: userExists.id },
        'An invite has been already sent to user'
      );
      throw new PublicError('An invite has been already sent to user');
    }

    const token = await generateUUID();
    const expiryHours = 24;
    const inviteExpiresAt = new Date();
    inviteExpiresAt.setHours(inviteExpiresAt.getHours() + expiryHours);

    const invite = await createCompanyInviteDao({
      companyId,
      userId: userExists.id,
      status: 'PENDING',
      recepientEmail: userEmail,
      token,
      inviteExpiresAt,
    });

    if (!invite) {
      logger.warn({ companyId, userId: userExists.id }, 'Failed to create invite');
      throw new PublicError('Failed to create invite');
    }

    await createUserNotificationService(user.id, {
      userId: userExists.id,
      type: 'COMPANY_REQUEST_TO_JOIN',
      title: 'Invitation to join company company',
      body: `You have been invited to join ${company.name}`,
      data: {
        companyId: company.id,
        companyName: company.name,
        token: invite.token,
      },
    });

    return invite;
  } catch (error) {
    logger.error({
      error: errorHandler(error),
      stack: error instanceof Error ? error.stack : undefined,
      userId: user.id,
      companyId,
      userEmail,
    });
    throw error;
  }
};
