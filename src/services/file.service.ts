import { createServiceLogger } from '@/lib/logger/logger';
import { deleteFileFromBucket, getFilrUrlFromBucket, uploadFileToBucket } from '@/lib/s3';
import { KEY_COMPANY_IMAGE } from '@/shared/constants';
import { generateUUID } from '@/utils/crypting.util';

const logger = createServiceLogger('company.service');

type UploadableFile = {
  stream: () => ReadableStream;
  type: string;
  size: number;
};

export const getCompanyImageURLService = (companyId: string, imageId: string) => {
  const bucketURL = getFilrUrlFromBucket({
    key: KEY_COMPANY_IMAGE(companyId, imageId),
  });
  return bucketURL;
};

export const uploadCompanyImageService = async (companyId: string, imageFile: UploadableFile) => {
  const imageId = await generateUUID();
  const key = KEY_COMPANY_IMAGE(companyId, imageId);

  await uploadFileToBucket(imageFile, key);

  return { imageId, key };
};

export const deleteCompanyImageService = async (companyId: string, imageId: string) => {
  try {
    const key = KEY_COMPANY_IMAGE(companyId, imageId);
    await deleteFileFromBucket({ key });

    return true;
  } catch (error) {
    logger.error({ error }, 'SERVICE. Failed to delete company image');
    return false;
  }
};
