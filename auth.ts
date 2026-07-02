import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./lib/validations/auth";
import {
  createUser,
  findUserByEmail,
  verifyPassword,
} from "./services/user.service";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  trustHost: process.env.NODE_ENV === "development" || !!process.env.VERCEL,
  providers: [
    Google,

    Credentials({
      async authorize(credentials) {
        try {
          const parsed = loginSchema.safeParse(credentials);
          if (!parsed.success) return null;
          const { email, password } = parsed.data;

          const user = await findUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordMatch = await verifyPassword(password, user.password);
          if (!passwordMatch) return null;

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (err) {
          console.error("authorize() error:", err);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },

  callbacks: {
    ...authConfig.callbacks,

    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const existing = await findUserByEmail(user.email!);
        if (!existing) {
          await createUser({
            email: user.email!,
            fullName: user.name!,
          });
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      // OAuth providers don't supply role — fetch it from DB
      if (!token.role && token.email) {
        const dbUser = await findUserByEmail(token.email as string);
        if (dbUser) {
          token.id = (dbUser._id as { toString(): string }).toString();
          token.role = dbUser.role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});
