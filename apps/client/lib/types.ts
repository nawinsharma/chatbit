export interface User {
   id: string;
   name: string;
   email: string;
   emailVerified: boolean;
   createdAt: Date;
   updatedAt: Date;
   image?: string | null | undefined;
}

export interface CustomUser {
   id: string;
   name: string;
   email: string;
   emailVerified: boolean;
   createdAt: Date;
   updatedAt: Date;
   image?: string | null | undefined;
   token: string;
}