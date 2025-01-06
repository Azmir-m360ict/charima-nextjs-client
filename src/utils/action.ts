'use server';

import { auth, signIn, signOut } from '@/auth';
import { site_config } from '@/lib/site_config';
import { cookies } from 'next/headers';

export async function SocialLogin(action: 'google', redirect?: string | null) {
  await signIn(action, { redirectTo: redirect ? `/${redirect}` : '/' });
}

export async function doLogout() {
  const cookieStore = await cookies();
  cookieStore.delete(site_config.token_name);
  await signOut({ redirectTo: '/' });
}

interface ILogin {
  formData: FormData;
  redirectTo?: string | undefined;
}

export async function doCredentialLogin({ formData, redirectTo }: ILogin) {
  try {
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirectTo: `/${redirectTo}`,
    });
  } catch (err: any) {
    throw err;
  }
}

export async function getUser() {
  return await auth();
}

export async function getHeaders() {}

export async function setAuthCookies(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(site_config.token_name, token, {
    maxAge: 24 * 60 * 60,
  });
}
