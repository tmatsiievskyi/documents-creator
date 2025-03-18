// 'use client';

// import { useForm, FormProvider } from 'react-hook-form';
// import { SignInMagicForm } from './sign-in_magic.component';
// import { TSignInMagicSchema, signInMagicDefaultValues, signInMagicSchema } from './_schemas';
// import { zodResolver } from '@hookform/resolvers/zod';

// export const WithSignInMagicForm = () => {
//   const methods = useForm<TSignInMagicSchema>({
//     mode: 'all',
//     resolver: zodResolver(signInMagicSchema),
//     defaultValues: signInMagicDefaultValues,
//   });

//   return (
//     <FormProvider {...methods}>
//       <SignInMagicForm />
//     </FormProvider>
//   );
// };
