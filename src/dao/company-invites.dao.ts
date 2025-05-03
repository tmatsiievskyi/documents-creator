import { database } from '@/db';
import {
  companyInvitesTable,
  TCompanyInvites,
  TCompanyInvitesInsert,
} from '@/db/schema/company-invites';
import { createDaoLogger } from '@/lib/logger/logger';
import { errorHandler } from '@/utils';
import { and, eq } from 'drizzle-orm';

const logger = createDaoLogger('company-invites.dao');

export const getCompanyInvitesForUserDao = async (
  companyId: string,
  userEmail: string,
  status?: TCompanyInvites['status']
) => {
  logger.debug({ companyId, userEmail, status }, 'Getting company invites for userEmail');
  try {
    const invitesArr = await database.query.companyInvitesTable.findMany({
      where: and(
        eq(companyInvitesTable.companyId, companyId),
        eq(companyInvitesTable.recepientEmail, userEmail),
        status ? eq(companyInvitesTable.status, status) : undefined
      ),
    });
    logger.info(
      {
        companyId,
        userEmail,
        count: invitesArr.length,
      },
      'Found company invites for userEmail'
    );
    return invitesArr;
  } catch (error) {
    logger.error(
      {
        error: errorHandler(error),
        stack: error instanceof Error ? error.stack : undefined,
        table: 'doc_company_invites',
      },
      'Error getting company invites for userEmail'
    );
    throw error;
  }
};

export const createCompanyInviteDao = async (data: TCompanyInvitesInsert) => {
  logger.debug(
    { userId: data.userId, companyId: data.companyId },
    'Creating company invite to user'
  );

  try {
    const [invite] = await database.insert(companyInvitesTable).values(data).returning();

    logger.info(
      {
        inviteId: invite.id,
        companyId: invite.companyId,
        recipientEmail: invite.recepientEmail,
      },
      'Company invitation created'
    );

    return invite;
  } catch (error) {
    logger.error({
      error: errorHandler(error),
      stack: error instanceof Error ? error.stack : undefined,
      table: 'doc_company_invites',
    });
  }
};
