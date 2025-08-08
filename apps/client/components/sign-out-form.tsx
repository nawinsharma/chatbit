"use client"

import { authClient } from '@/lib/auth-client'
import { redirect } from 'next/navigation'
import React from 'react'

export default function SignOutForm(
   { children }: React.PropsWithChildren<unknown>
) {
   const handleSignOut = async () => {
      await authClient.signOut();
      redirect("/sign-in")
   }

   return (
      <div onClick={handleSignOut}>
         {children}
      </div>
   )
}
