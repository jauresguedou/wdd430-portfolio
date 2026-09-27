'use server';

import { AuthError } from 'next-auth';
import { signIn } from '@/auth';

export type LoginState = {
  message: string | null;
};

export async function authenticate(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  try {
    await signIn('credentials', formData, { redirectTo: '/dashboard' });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        message: error.type === 'CredentialsSignin'
          ? 'Email or password is incorrect.'
          : 'Unable to sign in right now. Please try again.',
      };
    }

    throw error;
  }

  return { message: null };
}