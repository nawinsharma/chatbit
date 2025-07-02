import { betterAuth, BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma"
import { admin, openAPI } from "better-auth/plugins"
import prisma from "@repo/db/client";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql"
    }),

    socialProviders: {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
    },

    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        // BUG: Prob a bug with updateAge method. It throws an error - Argument `where` of type SessionWhereUniqueInput needs at least one of `id` arguments. 
        // As a workaround, set updateAge to a large value for now.
        updateAge: 60 * 60 * 24 * 7, // 7 days (every 7 days the session expiration is updated)
        cookieCache: {
          enabled: true,
          maxAge: 5 * 60 // Cache duration in seconds
        }
    },

    plugins: [openAPI(), admin({
        impersonationSessionDuration: 60 * 60 * 24 * 7, // 7 days
    })],
} satisfies BetterAuthOptions)

export type Session = typeof auth.$Infer.Session;