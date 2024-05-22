import {NextAuthConfig} from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/authentication/login',
    signOut: '/authentication/signUp',
  },
  callbacks: {
    authorized({auth, request: {nextUrl}}) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard/main', nextUrl));
      }
      return true;
    },
    async redirect({url, baseUrl}) {
      return baseUrl + '/dashboard/main';
    },
  },
  providers: [],
} satisfies NextAuthConfig;
