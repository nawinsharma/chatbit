"use client";
import React, { useState, useEffect, useCallback } from "react";
import ChatUserDialog from "./ChatUserDialog";
import ChatSidebar from "./ChatSidebar";
import Chats from "./Chats";
import { MessageType, GroupChatUserType, GroupChatType } from "@/type";
import ChatNav from "./ChatNav";
import { fetchChatGroupUsers } from "@/fetch/groupFetch";
import { getSocket } from "@/lib/socket.config";

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
    console.log("Retrieved localStorage data for group", group.id, ":", data);
    if (data) {
      const pData = JSON.parse(data);
      console.log("Parsed localStorage data:", pData);
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

  // Function to refresh chat user from localStorage
  const refreshChatUser = useCallback(() => {
    const data = localStorage.getItem(group.id);
    console.log("Refreshing chatUser from localStorage:", data);
    if (data) {
      const pData = JSON.parse(data);
      console.log("Setting chatUser to:", pData);
      setChatUser(pData);
    }
  }, [group.id]);

  // Socket event listeners for real-time user updates
  useEffect(() => {
    const socket = getSocket({ room: group.id });
    
    // Listen for user join events
    const handleUserJoined = (data: { user: GroupChatUserType; group_id: string; timestamp: string }) => {
      console.log("👤 User joined event received:", data);
      if (data.group_id === group.id) {
        setUsers(prevUsers => {
          // Check if user already exists
          const existingUser = prevUsers.find(u => u.id === data.user.id);
          if (existingUser) {
            return prevUsers; // User already exists, don't add duplicate
          }
          return [...prevUsers, data.user];
        });
      }
    };

    // Listen for user leave events
    const handleUserLeft = (data: { user: GroupChatUserType; group_id: string; timestamp: string }) => {
      console.log("👤 User left event received:", data);
      if (data.group_id === group.id) {
        setUsers(prevUsers => prevUsers.filter(u => u.id !== data.user.id));
      }
    };

    socket.on('user_joined', handleUserJoined);
    socket.on('user_left', handleUserLeft);

    return () => {
      socket.off('user_joined', handleUserJoined);
      socket.off('user_left', handleUserLeft);
    };
  }, [group.id]);

  // Refresh users and chat user when dialog closes (after successful join)
  useEffect(() => {
    if (!open) {
      refreshUsers();
      refreshChatUser();
    }
  }, [open, refreshUsers, refreshChatUser]);
  
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
            <ChatUserDialog 
              open={open} 
              setOpen={setOpen} 
              group={group} 
              onUserJoined={() => {
                refreshUsers();
                refreshChatUser();
              }} 
            />
          ) : (
            <Chats oldMessages={oldMessages} group={group} chatUser={chatUser} />
          )}
        </div>
      </div>
    </div>
  );
}
