"use client";

import ChatBase from "@/components/chat-page-components/ChatBase";
import { fetchChats } from "@/fetch/chatsFetch";
import { fetchChatGroup, fetchChatGroupUsers } from "@/fetch/groupFetch";
import { MessageType } from "@/type";
import { GroupChatUserType } from "@/type";
import { GroupChatType } from "@/type";
import { notFound } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function ChatPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: session, isPending } = authClient.useSession();
  
  const [chatGroup, setChatGroup] = useState<GroupChatType | null>(null);
  const [chatGroupUsers, setChatGroupUsers] = useState<Array<GroupChatUserType>>([]);
  const [chats, setChats] = useState<Array<MessageType>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const loadData = async () => {
        try {
          setLoading(true);
          setError(null);
          
          // Validate ID length
          if (id.length !== 36) {
            setError("Invalid chat group ID");
            return;
          }

          // Always fetch the chat group data (no authentication required)
          const groupData = await fetchChatGroup(id);
          
          if (!groupData) {
            setError("Chat group not found");
            return;
          }

          setChatGroup(groupData);
          
          // Only fetch users and chats if user is authenticated
          if (session && !isPending) {
            try {
              const [usersData, chatsData] = await Promise.all([
                fetchChatGroupUsers(id),
                fetchChats(id)
              ]);
              
              setChatGroupUsers(usersData || []);
              setChats(chatsData || []);
            } catch (err) {
              console.error("Error loading authenticated data:", err);
              // Don't set error for this, just use empty arrays
              setChatGroupUsers([]);
              setChats([]);
            }
          } else {
            // For unauthenticated users, start with empty arrays
            setChatGroupUsers([]);
            setChats([]);
          }
        } catch (err) {
          console.error("Error loading chat data:", err);
          setError("Failed to load chat data");
        } finally {
          setLoading(false);
        }
      };

      loadData();
    }
  }, [session, isPending, id]);

  if (isPending || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  if (!chatGroup) {
    return notFound();
  }

  return (
    <div>
      <ChatBase group={chatGroup} users={chatGroupUsers} oldMessages={chats} />
    </div>
  );
}
