import { icons } from '@/ui';
import { Button, ButtonProps } from '@/ui/button';

type TProps = {
  isLooading: boolean;
} & ButtonProps;

export const LoadingButton = ({
  isLooading,
  type = 'submit',
  children,
  className,
  ...props
}: TProps) => {
  const LoaderIcon = icons['Loader2'];
  return (
    <Button disabled={isLooading} type={type} className={className} {...props}>
      {isLooading && <LoaderIcon className=" size-4 animate-spin" />}
      {children}
    </Button>
  );
};
