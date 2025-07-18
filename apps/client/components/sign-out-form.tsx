import { authClient } from '@/lib/auth-client'
import { redirect } from 'next/navigation'
import React from 'react'

export default function SignOutForm(
   { children }: React.PropsWithChildren<unknown>
) {
   return (
      <form action={async () => {
         await authClient.signOut();
         redirect("/")
      }}>
         {children}
      </form>
   )
}
