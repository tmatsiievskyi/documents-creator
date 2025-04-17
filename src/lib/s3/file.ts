import { env } from '../env';
import { Upload } from '@aws-sdk/lib-storage';
import { DeleteObjectCommand, GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.CLOUDFLARE_ACCESS_KEY_ID,
    secretAccessKey: env.CLOUDFLARE_SECRET_ACCESS_KEY,
  },
});

export const uploadFileToBucket = async (file: File, filename: string) => {
  const Key = filename;
  const Bucket = env.CLOUDFLARE_BUCKET_NAME;

  const parallelUploads = new Upload({
    client: s3Client,
    params: {
      Bucket,
      Key,
      Body: file.stream(),
      ACL: 'public-read',
      ContentType: file.type,
    },
    queueSize: 4,
    leavePartsOnError: false,
  });

  const res = await parallelUploads.done();

  return res;
};

export const getFilrUrlFromBucket = async ({ key }: { key: string }) => {
  const url = await getSignedUrl(
    s3Client,
    new GetObjectCommand({
      Key: key,
      Bucket: env.CLOUDFLARE_BUCKET_NAME,
    }),
    { expiresIn: 3600 }
  );
  return url;
};

export const deleteFileFromBucket = async ({ key }: { key: string }) => {
  const command = new DeleteObjectCommand({
    Key: key,
    Bucket: env.CLOUDFLARE_BUCKET_NAME,
  });

  const response = await s3Client.send(command);
  return response;
};
