import { Avatar, AvatarFallback, AvatarImage } from '@/ui';

export const AvatarComponent = ({ imgSrc }: { imgSrc?: string }) => {
  // TODO: use imgSrc
  return (
    <Avatar className="size-8 rounded-lg">
      <AvatarImage src="https://github.com/shadcn.png" alt="docs_avatar" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};
