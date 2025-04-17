import {
  createCompanyDao,
  deleteCompanyDao,
  getCompanyByIdDao,
  TGetCompanyByIdOptions,
  updateCompanyDao,
} from '@/dao/company.dao';
import { TUser } from '@/db/export-schema';
import { createServiceLogger } from '@/lib/logger/logger';
import { uploadFileToBucket } from '@/lib/s3';
import { NotFoundError, PublicError } from '@/shared/app-errors';
import { generateUUID } from '@/utils/crypting.util';
// import { getCompanyImageKey } from './file.service';
import { TCreateCompanySchema, TUpdateCompanySchemaFE } from '@/lib/zod';
import { TFullCompany } from '@/shared/types';
import { KEY_COMPANY_IMAGE } from '@/shared/constants';
import { deleteCompanyImageService, uploadCompanyImageService } from './file.service';

const logger = createServiceLogger('company.service');

export const createCompanyService = async (user: TUser, input: TCreateCompanySchema) => {
  logger.debug({ userId: user.id, name: input.name }, 'Attempting to create a company');

  const { companyImage, ...restCompany } = input;

  let company = await createCompanyDao({ ...restCompany, ownerId: user.id });

  if (companyImage) {
    const companyImageId = await generateUUID();
    await uploadFileToBucket(companyImage, KEY_COMPANY_IMAGE(company.id, companyImageId));
    company = await updateCompanyDao(company.id, { companyImageId });
  }

  return company;
};

export const updateCompanyService = async (
  userId: string,
  companyId: string,
  data: TUpdateCompanySchemaFE
) => {
  logger.debug({ userId, data }, 'Attempting to update company');
  const company = await getCompanyByIdDao(companyId, { includeMembers: true, inlcudeOwner: true });

  if (!company) {
    logger.warn({ companyId }, 'Company not found');
    throw new NotFoundError('Company was not found');
  }

  if (!isUserOwnerOrAdminService(userId, company)) {
    throw new PublicError('You do not have permission to update company');
  }

  const { companyImage, ...restData } = data;
  let imageData = {};

  if (companyImage instanceof File) {
    if (company.companyImageId) {
      // delete existing company image
      await deleteCompanyImageService(companyId, company.companyImageId);
    }

    const { imageId } = await uploadCompanyImageService(companyId, companyImage);
    imageData = {
      companyImageId: imageId,
    };
  } else if (companyImage === null && company.companyImageId) {
    // companyImage is set to null, but company have stored image in db
    await deleteCompanyImageService(companyId, company.companyImageId);

    imageData = {
      companyImage: null,
      companyImageId: null,
    };
  }

  const updatedCompany = await updateCompanyDao(companyId, {
    ...restData,
    ...imageData,
  });

  logger.info({ userId, updatedCompany }, 'SERVICE. Updated company');
  return updatedCompany;
};

export const deleteCompanyService = async (userId: string, companyId: string) => {
  logger.debug({ userId, companyId }, 'SERVICE. Attempting to delete company');

  const company = await getCompanyByIdDao(companyId, { inlcudeOwner: true });

  if (!company) {
    logger.warn({ companyId }, 'SERVICE. Company not found for deletion');
    throw new NotFoundError('Company was not found');
  }

  if (company.ownerId !== userId) {
    logger.warn({ userId, companyId }, 'SERVICE. User is not the owner of this company');
    throw new PublicError('Only the owner can delete a company');
  }

  if (company.companyImageId) {
    await deleteCompanyImageService(companyId, company.companyImageId);
  }

  const deletedCompany = await deleteCompanyDao(companyId);
  logger.info({ userId, companyId }, 'SERVICE. Deleted company success');

  return deletedCompany;
};

export const getCompanyByIdService = async (
  companyId: string,
  options?: TGetCompanyByIdOptions
) => {
  logger.debug({ companyId, options }, 'SERVICE. GET Company by ID');
  const company = await getCompanyByIdDao(companyId, options);

  if (!company) {
    logger.warn({ companyId }, 'Company not found');
    throw new NotFoundError('Company was not found');
  }

  logger.info({ companyId, companyName: company.name }, 'Retrieved company');
  return company;
};

export const isUserOwnerOrAdminService = (userId: string, company: TFullCompany) => {
  logger.debug({ userId, companyId: company.id }, 'SERVICE. GET User role in company');
  if (company.ownerId === userId) return true;

  const { members } = company;
  const userInCompany = members?.find(member => member.user?.id === userId);
  if (!userInCompany) {
    logger.warn({ userId, companyId: company.id }, 'User is not related to this company');
    throw new NotFoundError('User is not related to this company');
  }

  const userRoleInCompany = userInCompany.role;

  if (userRoleInCompany === 'ADMIN') return true;

  logger.warn(
    { userId, companyId: company.id },
    'User does not have permission to update a company'
  );
  return false;
};
