"use client"

import { authClient } from '@/lib/auth-client'
import { redirect } from 'next/navigation'
import React, { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function SignOutForm(
   { children }: React.PropsWithChildren<unknown>
) {
   const [isOpen, setIsOpen] = useState(false)

   const handleSignOut = async () => {
      await authClient.signOut();
      redirect("/")
   }

   return (
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
         <AlertDialogTrigger asChild>
            {children}
         </AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Are you sure you want to sign out?</AlertDialogTitle>
               <AlertDialogDescription>
                  You will be logged out of your account and redirected to the home page.
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>Cancel</AlertDialogCancel>
               <AlertDialogAction onClick={handleSignOut} className="bg-red-500 text-white hover:bg-red-600">
                  Sign Out
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   )
}
