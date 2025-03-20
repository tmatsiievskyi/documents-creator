import { RHFInput } from '@/lib/rhf';
import { TSignInEmailSchema } from './_schemas';
import { Button } from '@/ui/button';
import { useFormContext } from 'react-hook-form';
import Link from 'next/link';
import { URL_SIGN_UP } from '@/shared/constants';

export const SignInEmailForm = () => {
  const { handleSubmit } = useFormContext<TSignInEmailSchema>();

  const onSubmit = handleSubmit(data => {
    console.log('submit');
  });

  return (
    <form className="auth-form text-left" onSubmit={onSubmit}>
      <RHFInput<TSignInEmailSchema> name="email" label="Email" placeholder="Enter your email" />
      <RHFInput<TSignInEmailSchema>
        name="password"
        label="Password"
        placeholder="Enter your password"
        inputClassName="shad-input"
      />
      <Button type="submit" className="form-submit-button">
        Sign In
      </Button>
      <div className=" body-2 flex-center">
        <p className="text-muted-200">{"Don't have an account?"}</p>{' '}
        <Link className="text-primary ml-2" href={URL_SIGN_UP}>
          Sign Up
        </Link>
      </div>
    </form>
  );
};
