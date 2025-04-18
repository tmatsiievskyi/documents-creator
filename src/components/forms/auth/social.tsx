import { icons } from '@/ui';
import { Button } from '@/ui/button';

const socialItems = [
  {
    Icon: icons['GoogleIcon'],
    title: 'Sign In with Google',
  },
  {
    Icon: icons['FBIcon'],
    title: 'Sign In with Facebook',
  },
];

export const SocialAuth = () => {
  return (
    <>
      <div className=" mt-4 flex w-full cursor-pointer justify-center gap-x-4">
        {socialItems.map(item => {
          const { Icon, title } = item;
          return (
            <Button variant="outline" key={title} className="w-full max-w-[80px]">
              <Icon customClassName="size-8" />
            </Button>
          );
        })}
      </div>
    </>
  );
};
