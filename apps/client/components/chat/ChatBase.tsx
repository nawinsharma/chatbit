"use client";
import React, { useState, useEffect } from "react";
import ChatUserDialog from "./ChatUserDialog";
import ChatSidebar from "./ChatSidebar";
import Chats from "./Chats";
import { MessageType, GroupChatUserType, GroupChatType } from "@/type";
import ChatNav from "./ChatNav";

export default function ChatBase({
  group,
  users,
  oldMessages,
}: {
  group: GroupChatType;
  users: Array<GroupChatUserType> | [];
  oldMessages: Array<MessageType> | [];
}) {
  const [open, setOpen] = useState(true);
  const [chatUser, setChatUser] = useState<GroupChatUserType>();
  useEffect(() => {
    const data = localStorage.getItem(group.id);
    if (data) {
      const pData = JSON.parse(data);
      setChatUser(pData);
    }
  }, [group.id]);
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <ChatSidebar users={users} />
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Sticky/fixed navbar with sidebar toggle */}
        <div className="sticky top-0 z-20 bg-white/80">
          <div className="flex items-center gap-2 px-4 py-2 border-b">
            {/* Sidebar toggle removed since using normal sidebar */}
            <div className="flex-1">
              <ChatNav chatGroup={group} users={users} user={chatUser} />
            </div>
          </div>
        </div>
        {/* Main chat area: messages and input, scrollable */}
        <div className="flex-1 min-h-0 w-full max-w-full flex flex-col">
          {open ? (
            <ChatUserDialog open={open} setOpen={setOpen} group={group} />
          ) : (
            <Chats oldMessages={oldMessages} group={group} chatUser={chatUser} />
          )}
        </div>
      </div>
    </div>
  );
}
