import { RHFInput } from '@/lib/rhf';
import { TSignUpSchema } from './_schemas';
import { Button } from '@/ui/button';
import { useFormContext } from 'react-hook-form';
import Link from 'next/link';

export const SignUpForm = () => {
  const { handleSubmit } = useFormContext<TSignUpSchema>();

  const onSubmit = handleSubmit(data => {
    console.log('submit');
  });

  return (
    <form className="auth-form" onSubmit={onSubmit}>
      <p className="form-title">Sign up</p>
      <RHFInput<TSignUpSchema>
        name="fullName"
        label="Full Name"
        placeholder="Enter your Full Name"
      />

      <RHFInput<TSignUpSchema> name="email" label="Email" placeholder="Enter your email" />
      <RHFInput<TSignUpSchema> name="password" label="Password" placeholder="Enter your password" />
      <RHFInput<TSignUpSchema>
        name="passwordConfirm"
        label="Password Confirm"
        placeholder="Repeat your password"
        inputClassName="shad-input"
      />
      <Button type="submit" className="form-submit-button">
        Sign In
      </Button>
      <div className=" body-2 flex-center">
        <p className="text-muted-200">Already have an account?</p>{' '}
        <Link className="ml-2 text-primary" href="/sign-in">
          Sign In
        </Link>
      </div>
    </form>
  );
};
