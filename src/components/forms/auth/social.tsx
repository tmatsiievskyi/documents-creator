import { cn } from '@/lib/utils';
import { icons, Tooltip, TooltipTrigger } from '@/ui';

const socialItems = [
  {
    Icon: icons['GoogleIcon'],
    title: 'Sign In with Google',
    wrapperClassName: '',
  },
  {
    Icon: icons['FBIcon'],
    title: 'Sign In with Facebook',
    wrapperClassName: 'mt-4',
  },
];

export const SocialAuth = () => {
  return (
    <>
      <div className="flex-center mt-4 w-full cursor-pointer flex-col gap-x-4">
        {socialItems.map(item => {
          const { Icon, title, wrapperClassName } = item;
          return (
            <Tooltip key={item.title}>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    'shadow-deeper flex w-full items-center rounded-xl px-5 py-2 hover:shadow-inner',
                    wrapperClassName
                  )}
                >
                  <Icon customClassName="size-8 mr-4" />
                  <span>{title}</span>
                </div>
              </TooltipTrigger>
            </Tooltip>
          );
        })}
      </div>
    </>
  );
};
