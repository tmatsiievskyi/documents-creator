import { getCurrentUser } from '@/services';
import { getCompanyImageURLService } from '@/services/file.service';
import { NextResponse } from 'next/server';
import { streamImageFromUrl } from '../../../../streams';

export const dynamic = 'force-dynamic';

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ companyId: string; imageId: string }> }
) => {
  try {
    const { companyId, imageId } = await params;

    await getCurrentUser();

    const url = await getCompanyImageURLService(companyId, imageId);

    return streamImageFromUrl(url);
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
};
