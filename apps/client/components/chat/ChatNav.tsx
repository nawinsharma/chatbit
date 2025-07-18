import React from "react";
import MobileChatSidebar from "./MobileChatSidebar";
import { GroupChatType, GroupChatUserType } from "@/type";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Users } from "lucide-react";

export default function ChatNav({
  chatGroup,
  users,
  user,
}: {
  chatGroup: GroupChatType;
  users: Array<GroupChatUserType> | [];
  user?: GroupChatUserType;
}) {
  return (
    <nav className="w-full flex justify-between items-center px-8 py-3 bg-white/80 shadow border-b sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <span className="md:hidden">
          <MobileChatSidebar users={users} />
        </span>
        <span className="flex items-center gap-2">
          <Users className="h-6 w-6 text-blue-500" />
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text drop-shadow">
            {chatGroup.title}
          </h1>
        </span>
      </div>
      {user && (
        <span className="flex items-center gap-2">
          <Avatar className="h-8 w-8 border-2 border-blue-200">
            <AvatarFallback className="bg-blue-100 text-blue-700 font-bold">
              {user.name ? user.name.charAt(0) : '?'}
            </AvatarFallback>
          </Avatar>
          <span className="font-semibold text-blue-900 text-sm truncate max-w-[120px]">{user.name}</span>
        </span>
      )}
    </nav>
  );
}
