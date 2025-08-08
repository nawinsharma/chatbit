import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NODE_ENV === "production" 
    ? "https://chatbit-server.onrender.com/api/auth"
    : "http://localhost:8080/api/auth",
  credentials: "include",
});
