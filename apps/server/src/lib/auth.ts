import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"    
  }),
  trustedOrigins: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://chatbit.nawin.xyz",
    process.env.CORS_ORIGIN || "",
  ],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
       clientId: process.env.GOOGLE_CLIENT_ID as string,
       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
 },
});



