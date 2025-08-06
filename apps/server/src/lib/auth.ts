import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"    
  }),
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:8080",
  secret: process.env.BETTER_AUTH_SECRET || "KtIGtNKmPS9PjZFnlfFTVzmb6hOyvYUU",
  trustedOrigins: [
    process.env.NODE_ENV === "production"
      ? "https://chatbit.nawin.xyz"
      : "http://localhost:3000",
  ],
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5 // 5 minutes
    }
  },
  cookies: {
    sessionToken: {
      name: "better-auth.session-token",
      attributes: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Only secure in prod
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // None for cross-site
        path: "/"
        // Do NOT set domain unless you have a multi-subdomain setup
      }
    }
  },
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



