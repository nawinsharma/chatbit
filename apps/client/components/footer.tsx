import React from 'react'

export default function Footer() {
   return (
      <footer className="border-t py-6 md:py-0">
         <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
               &copy; <span suppressHydrationWarning={true}>{new Date().getFullYear()}</span> AuthSystem. All rights reserved.
            </p>
         </div>
      </footer>
   )
}
