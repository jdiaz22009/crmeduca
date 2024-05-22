import NextAuth from 'next-auth';
import {authConfig} from './auth.config';

// import {cookies} from 'next/headers';
// import {decrypt} from './app/lib/session';

// const protectedRoutes = ['/dashboard/main'];
// const publicRoutes = ['/authentication/login', '/authentication/signUp', '/'];

// export default async function middleware(req: NextRequest) {
//   const path = req.nextUrl.pathname;
//   const isProtectedRoute = protectedRoutes.includes(path);
//   const isPublicRoute = publicRoutes.includes(path);

//   const cookie = cookies().get('session')?.value;
//   const session = await decrypt(cookie);

//   if (isProtectedRoute && !session?.userId) {
//     return NextResponse.redirect(new URL('/authentication/login', req.nextUrl));
//   }

//   if (
//     isPublicRoute &&
//     session?.userId &&
//     !req.nextUrl.pathname.startsWith('/dashboard')
//   ) {
//     return NextResponse.redirect(new URL('/dashboard/main', req.nextUrl));
//   }

//   return NextResponse.next();
// }

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
