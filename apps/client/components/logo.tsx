import { MessageSquare } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Logo() {
   return (
      <Link href="/" className="flex items-center gap-2 self-center font-medium">
         <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-sm">
            <MessageSquare className="size-4" />
         </div>
         <span className="text-lg font-bold bg-gradient-to-r from-violet-500 to-blue-700 bg-clip-text text-transparent dark:from-violet-500 dark:to-blue-400">
            Chatbit
         </span>
      </Link>
   )
}
