import type { NextAuthConfig } from "next-auth";

const AUTH_ROUTES = ["/login", "/register"];
const PROTECTED_ROUTES = ["/admin"];

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const { pathname } = nextUrl;

      const isAuthenticated = !!auth?.user;

      const isAuthRoute = AUTH_ROUTES.some((route) =>
        pathname.startsWith(route),
      );

      const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
        pathname.startsWith(route),
      );

      if (isAuthRoute && isAuthenticated) {
        return Response.redirect(new URL("/admin", nextUrl));
      }

      if (isProtectedRoute) {
        return isAuthenticated;
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
