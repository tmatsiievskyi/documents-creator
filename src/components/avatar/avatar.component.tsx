import { TProfile } from '@/db/export-schema';
import { API_USER_PROFILE_IMAGE } from '@/shared/constants';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui';

export const getProfileImageFullUrl = (profile?: TProfile | null) => {
  if (!profile) return undefined;
  return profile.imageId
    ? API_USER_PROFILE_IMAGE(profile.userId, profile.imageId)
    : profile.image
      ? profile.image
      : undefined;
};

export const AvatarComponent = ({ profile }: { profile?: TProfile | null }) => {
  return (
    <Avatar className="size-8 rounded-lg">
      <AvatarImage
        src={getProfileImageFullUrl(profile)}
        alt="docs_avatar"
        referrerPolicy="no-referrer"
      />
      <AvatarFallback>{profile?.fullName?.substring(0, 2).toUpperCase() ?? 'U'}</AvatarFallback>
    </Avatar>
  );
};
