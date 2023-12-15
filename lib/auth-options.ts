import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "./db";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _req) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }
        try {
          const response = await fetch(
            `${process.env.NEXTAUTH_URL}/api/auth/sign-in`,
            {
              method: "POST",
              body: JSON.stringify(credentials),
            }
          );
          const data = await response.json();
          if (response.ok) {
            return data.user;
          } else {
            return null;
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({ token }) {
      const user = await db.user.findUnique({
        where: {
          email: token.email as string,
        },
      });
      return user ? { ...token, id: user.id } : token;
    },
    async session({ session, token }) {
      if (token) {
        return {
          ...session,
          user: {
            id: token.id,
            name: token.name,
            email: token.email,
            image: token.picture,
          },
        };
      }
      return session;
    },
  },
};

export default authOptions;
