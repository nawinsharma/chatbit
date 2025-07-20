"use client";
import React, { useState, useEffect, useCallback } from "react";
import ChatUserDialog from "./ChatUserDialog";
import ChatSidebar from "./ChatSidebar";
import Chats from "./Chats";
import { MessageType, GroupChatUserType, GroupChatType } from "@/type";
import ChatNav from "./ChatNav";
import { fetchChatGroupUsers } from "@/fetch/groupFetch";

export default function ChatBase({
  group,
  users: initialUsers,
  oldMessages,
}: {
  group: GroupChatType;
  users: Array<GroupChatUserType> | [];
  oldMessages: Array<MessageType> | [];
}) {
  const [open, setOpen] = useState(true);
  const [chatUser, setChatUser] = useState<GroupChatUserType>();
  const [users, setUsers] = useState<Array<GroupChatUserType>>(initialUsers);
  
  useEffect(() => {
    const data = localStorage.getItem(group.id);
    if (data) {
      const pData = JSON.parse(data);
      setChatUser(pData);
    }
  }, [group.id]);

  // Function to refresh users list
  const refreshUsers = useCallback(async () => {
    try {
      const updatedUsers = await fetchChatGroupUsers(group.id);
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Failed to refresh users:", error);
    }
  }, [group.id]);

  // Refresh users when dialog closes (after successful join)
  useEffect(() => {
    if (!open) {
      refreshUsers();
    }
  }, [open, refreshUsers]);
  
  return (
    <div className="flex h-screen bg-background">
      {/* Background with theme-aware styling */}
      <div className="fixed inset-0 z-[-1] h-screen w-screen">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      </div>
      
      <ChatSidebar users={users} />
      
      <div className="flex-1 min-w-0 flex flex-col relative">
        {/* Chat Navigation */}
        <div className="sticky top-0 z-20 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
          <ChatNav chatGroup={group} users={users} user={chatUser} />
        </div>
        
        {/* Main chat area */}
        <div className="flex-1 min-h-0 w-full max-w-full flex flex-col">
          {open ? (
            <ChatUserDialog open={open} setOpen={setOpen} group={group} onUserJoined={refreshUsers} />
          ) : (
            <Chats oldMessages={oldMessages} group={group} chatUser={chatUser} />
          )}
        </div>
      </div>
    </div>
  );
}
