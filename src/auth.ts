import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import {z} from 'zod';

import {authConfig} from './auth.config';
import {login} from './providers/client/login';
import {createSession} from './app/lib/session';
export const {auth, signIn, signOut} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const parsedCredentials = z
            .object({email: z.string().email(), password: z.string().min(6)})
            .safeParse(credentials);
          if (parsedCredentials.success) {
            const {email, password} = parsedCredentials.data;

            const userlogin = await login({email, password});
            const token = await userlogin.user.getIdTokenResult();
            createSession(JSON.stringify(token));
            return userlogin?.user;
          }
          return null;
        } catch (error: any) {
          if (error?.code === 'auth/invalid-credential') {
            throw new Error(
              JSON.stringify({
                code: error?.code,
                message: 'Credenciales invalidas',
              }),
            );
          } else if (error?.code === 'auth/too-many-requests') {
            throw new Error(
              JSON.stringify({
                code: error?.code,
                message: 'Error interno',
              }),
            );
          }

          throw error;
        }
      },
    }),
  ],
});
