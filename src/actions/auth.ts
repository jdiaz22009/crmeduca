'use server';

import {addUser} from '@/providers/admin/user';
import {LoginFormSchema} from '../app/lib/LoginDefinition';
import {SignupFormSchema} from '../app/lib/signupDefinition';
import {signIn} from '@/auth';

export async function signup(formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    fullName: formData.get('fullName'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: {signup: validatedFields.error.flatten().fieldErrors},
    };
  }
  const {fullName, email, password} = validatedFields.data;

  try {
    const response = await addUser({fullName, email, password});
    return response;
  } catch (error) {
    throw error;
  }
}
export async function login(formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: {login: validatedFields.error.flatten().fieldErrors},
    };
  }
  const {email, password} = validatedFields.data;

  try {
    await signIn('credentials', {
      redirect: true,
      email,
      password,
    });

    return {success: true};
  } catch (error: any) {
    const errorMessage = error?.cause?.err?.message
      ? JSON.parse(error.cause.err.message)
      : null;

    return {
      success: false,
      errors: {form: errorMessage},
    };
  }
}
