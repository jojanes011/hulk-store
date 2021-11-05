import NextAuth from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from 'config/prisma';

const nextOptions = {
  site: process.env.NEXTAUTH_URL,
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async signIn(user) {
      if (Object.keys(user).includes('enabled')) {
        return user.enabled;
      }
      return true;
    },
    // async session(session) {
    //   const newSession = (await prisma.session.findFirst({
    //     where: {
    //       accessToken: session.accessToken,
    //     },
    //     include: {
    //       user: {
    //         include: {
    //           profile: true,
    //           roles: true,
    //         },
    //       },
    //     },
    //   })) as any;
    //   return newSession;
    // },
  },
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
    secret: process.env.NEXTAUTH_SECRET,
  },
};

export default (req, res) => NextAuth(req, res, nextOptions);
