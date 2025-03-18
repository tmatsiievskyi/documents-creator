import { RHFInput } from '@/lib/rhf';
import { TSignInEmailSchema } from './_schemas';
import { Button } from '@/ui/button';
import { useFormContext } from 'react-hook-form';
import Link from 'next/link';

export const SignInEmailForm = () => {
  const { handleSubmit } = useFormContext<TSignInEmailSchema>();

  const onSubmit = handleSubmit(data => {
    console.log('submit');
  });

  return (
    <form className="auth-form" onSubmit={onSubmit}>
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
        <Link className="ml-2 text-primary" href="/sign-up">
          Sign Up
        </Link>
      </div>
    </form>
  );
};
