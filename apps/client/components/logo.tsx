import { MessageSquare } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Logo() {
   return (
      <Link href="/" className="flex items-center gap-2 self-center font-medium">
         <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 dark:bg-blue-500 text-white shadow-sm">
            <MessageSquare className="size-4" />
         </div>
         <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
            Chatbit
         </span>
      </Link>
   )
}
