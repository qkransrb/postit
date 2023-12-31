import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcryptjs";
import db from "./db";

if (!process.env.NEXTAUTH_URL) {
  throw new Error("NEXTAUTH_URL not found");
}

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("NEXTAUTH_SECRET not found");
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _req) {
        console.log("credentials: ", credentials);
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }
        // try {
        //   const response = await fetch(
        //     `${process.env.NEXTAUTH_URL}/api/auth/sign-in`,
        //     {
        //       method: "POST",
        //       body: JSON.stringify(credentials),
        //     }
        //   );
        //   const data = await response.json();
        //   console.log("response: ", response);
        //   console.log("data: ", data);
        //   if (response.ok) {
        //     return data?.user;
        //   } else {
        //     return null;
        //   }
        // } catch (error) {
        //   console.log(error);
        //   return null;
        // }

        try {
          const user = await db.user.findUnique({
            where: {
              email: credentials.email,
            },
          });
          if (!user) return null;
          const comparedPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!comparedPassword) return null;
          return user;
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
