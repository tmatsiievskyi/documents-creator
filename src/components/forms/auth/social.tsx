import { icons } from '@/ui';
import { Button } from '@/ui/button';
import Link from 'next/link';

const socialItems = [
  {
    Icon: icons['GoogleIcon'],
    title: 'Sign In with Google',
    href: '/api/sign-in/google',
  },
  // {
  //   Icon: icons['FBIcon'],
  //   title: 'Sign In with Facebook',
  //   href: '/api/sign-in/facebook',
  // },
];

export const SocialAuth = () => {
  return (
    <>
      <div className=" mt-4 flex w-full cursor-pointer justify-center gap-x-4">
        {socialItems.map(item => {
          const { Icon, title, href } = item;
          return (
            <Button variant="outline" key={title} className="w-full" asChild>
              <Link href={href} className="flex items-center justify-center">
                <Icon customClassName="size-8 mr-1" />
                <span className="text-2 text-muted-foreground">Google</span>
              </Link>
            </Button>
          );
        })}
      </div>
    </>
  );
};
