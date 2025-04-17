import { env } from '@/lib/env';

export const APP_UI_NAME = 'Docs';
export const MAX_UPLOAD_IMAGE_SIZE = 1024 * 1024 * Number(env.NEXT_PUBLIC_MAX_UPLOAD_IMAGE_SIZE_MB);
