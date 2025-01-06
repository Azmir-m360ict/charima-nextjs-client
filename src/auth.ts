import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { ILoginRes } from './types/common.type';
import { setAuthCookies } from './utils/action';
import { API_ENDPOINTS } from './utils/api-call/api-endpoints';
import { fetchRequest } from './utils/fetchApis';

declare module 'next-auth' {
  interface Session {
    user: AuthUser & {
      name?: string;
      token?: string;
      ec_id?: number;
      ec_phone?: string;
      ec_image?: string | null;
      ec_status?: number;
      ec_is_deleted?: number;
    };
  }

  interface AuthUser {
    token?: string;
    ec_id?: number;
    ec_name?: string;
    ec_email?: string;
    ec_phone?: string;
    ec_image?: string | null;
    ec_status?: number;
    ec_is_deleted?: number;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  trustHost: true,
  debug: false,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),

    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (credentials === null) return null;

        const res = await fetchRequest<ILoginRes>(API_ENDPOINTS.USERS_LOGIN, {
          method: 'POST',
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          cache: 'no-store',
        });

        if (res?.token) {
          await setAuthCookies(res.token!);

          return {
            id: String(res.data?.ec_id),
            name: res.data?.ec_name,
            token: res.token,
            email: res.data?.ec_email,
            ec_email: res.data?.ec_email,
            ec_phone: res.data?.ec_phone,
            ec_image: res.data?.ec_image,
            ec_status: res.data?.ec_status,
            ec_is_deleted: res.data?.ec_is_deleted,
          };
        }
        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account, profile, session }) {
      if (user) {
        return {
          ...token,
          ...user,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        ...token,
        emailVerified: null,
        id: session.user.id,
        email: session.user.ec_email!,
        name: session.user.name!,
      };

      return session;
    },
  },

  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
    updateAge: 0,
  },

  pages: {
    signIn: '/login',
    newUser: '/signup',
  },
});
