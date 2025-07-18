import { authClient } from "@/lib/auth-client"
import { redirect } from "next/navigation"

export default async function AuthLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const { data: session } = await authClient.getSession();

   if (session) {
      return redirect("/")
   }
   return (
      <main>
         <div className="h-screen flex flex-col items-center justify-center">
            {children}
         </div>
      </main>
   );
}
