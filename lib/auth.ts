import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

const credentialsSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    Credentials({
      name: "Credenciais",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(raw) {
        const parsed = credentialsSchema.safeParse(raw);
        if (!parsed.success) return null;

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminHash = process.env.ADMIN_PASSWORD_HASH;
        if (!adminEmail || !adminHash) return null;

        const { email, password } = parsed.data;
        if (email.toLowerCase() !== adminEmail.toLowerCase()) return null;

        const ok = await bcrypt.compare(password, adminHash);
        if (!ok) return null;

        return {
          id: "admin",
          email: adminEmail,
          name: "Admin",
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = "admin";
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = (token.id as string) ?? "admin";
        session.user.role = (token.role as string) ?? "admin";
      }
      return session;
    },
    authorized({ auth, request }) {
      const isAdmin = request.nextUrl.pathname.startsWith("/admin");
      const isLogin = request.nextUrl.pathname.startsWith("/admin/login");
      if (!isAdmin || isLogin) return true;
      return Boolean(auth?.user);
    },
  },
});
