import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { registerSchema } from "./lib/validations/auth";
import {
  createUser,
  findUserByEmail,
  verifyPassword,
} from "./services/user.service";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  trustHost: true,
  providers: [
    Google,

    Credentials({
      async authorize(credentials) {
        try {
          const parsed = registerSchema.safeParse(credentials);
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
            name: user.name ?? undefined,
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
