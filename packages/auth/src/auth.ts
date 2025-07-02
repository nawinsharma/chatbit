import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma"
import { admin, openAPI } from "better-auth/plugins"
import prisma from "@repo/db/client"

if (!process.env.FRONTEND_URL || !process.env.BACKEND_URL) {
	throw new Error("Missing environment variables. FRONTEND_URL or BACKEND_URL is not defined");
}

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	plugins: [admin(), openAPI()],

	trustedOrigins: [process.env.FRONTEND_URL, process.env.BACKEND_URL],

	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			accessType: "offline",
			prompt: "consent",
		},
	},
});

export type Session = typeof auth.$Infer.Session;
