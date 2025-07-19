"use client";
import React from "react";
import { useRouter } from "next/navigation";
import MobileChatSidebar from "./MobileChatSidebar";
import { GroupChatType, GroupChatUserType } from "@/type";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { MessageSquareIcon, UsersIcon, ArrowLeftIcon } from "lucide-react";

export default function ChatNav({
  chatGroup,
  users,
  user,
}: {
  chatGroup: GroupChatType;
  users: Array<GroupChatUserType> | [];
  user?: GroupChatUserType;
}) {
  const router = useRouter();

  const handleBack = () => {
    router.push("/dashboard");
  };

  return (
    <nav className="w-full flex justify-between items-center px-6 py-4">
      <div className="flex items-center gap-4">
        <span className="md:hidden">
          <MobileChatSidebar users={users} />
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          className="hidden md:flex"
          aria-label="Go back to dashboard"
        >
          <ArrowLeftIcon className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-sm">
            <MessageSquareIcon className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-heading font-semibold text-foreground">
              {chatGroup.title}
            </h1>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <UsersIcon className="h-3 w-3" />
              <span>{users.length} {users.length === 1 ? 'member' : 'members'}</span>
            </div>
          </div>
        </div>
      </div>
      
      {user && (
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-medium text-foreground truncate max-w-[120px]">
              {user.name}
            </span>
            <span className="text-xs text-muted-foreground">
              Online
            </span>
          </div>
          <Avatar className="h-9 w-9 ring-2 ring-border">
            <AvatarFallback className="bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white font-semibold">
              {user.name ? user.name.charAt(0).toUpperCase() : '?'}
            </AvatarFallback>
          </Avatar>
        </div>
      )}
    </nav>
  );
}
