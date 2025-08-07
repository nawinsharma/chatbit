"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon, UsersIcon, CircleIcon } from "lucide-react";
import { GroupChatUserType } from "@/type";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";

export default function MobileChatSidebar({
  users,
}: {
  users: Array<GroupChatUserType> | [];
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
          <MenuIcon className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        {/* Header */}
        <div className="border-b border-border p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 dark:bg-blue-500 text-white shadow-sm">
              <UsersIcon className="h-5 w-5" />
            </div>
            <div>
              <SheetTitle className="text-lg font-heading font-semibold text-foreground">
                Members
              </SheetTitle>
              <p className="text-sm text-muted-foreground">
                {users.length} {users.length === 1 ? 'member' : 'members'} online
              </p>
            </div>
          </div>
        </div>

        {/* Users List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {users.length > 0 ? (
            users.map((user, index) => (
              <div
                key={index}
                className="group relative flex items-center gap-3 rounded-xl p-3 transition-all duration-200 hover:bg-muted/50"
              >
                {/* Background gradient effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                
                {/* Avatar */}
                <div className="relative">
                  <Avatar className="h-10 w-10 ring-2 ring-border group-hover:ring-violet-500/20 transition-all duration-200">
                    <AvatarFallback className="bg-blue-600 dark:bg-blue-500 text-white font-semibold">
                      {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                    </AvatarFallback>
                  </Avatar>
                  {/* Online indicator */}
                  <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background">
                    <CircleIcon className="h-full w-full text-green-500 fill-current" />
                  </div>
                </div>

                {/* User info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground truncate group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {user.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Joined {new Date(user.created_at).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: new Date(user.created_at).getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
                    })}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <UsersIcon className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-sm font-medium text-foreground mb-1">
                No members yet
              </h3>
              <p className="text-xs text-muted-foreground">
                Waiting for others to join...
              </p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
