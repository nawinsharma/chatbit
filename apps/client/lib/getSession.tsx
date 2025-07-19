'use client'
import { authClient } from "./auth-client";

export const getSession = async () => {
  const { data: session } = await authClient.useSession();
  return session;
};
