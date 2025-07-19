import ChatBase from "@/components/chat-page-components/ChatBase";
import { fetchChats } from "@/fetch/chatsFetch";

import { fetchChatGroup, fetchChatGroupUsers } from "@/fetch/groupFetch";
import { MessageType } from "@/type";
import { GroupChatUserType } from "@/type";
import { GroupChatType } from "@/type";
import { notFound } from "next/navigation";
import React from "react";

export default async function chat(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  if (id.length != 36) {
    return notFound();
  }
  const chatGroup: GroupChatType | null = await fetchChatGroup(id);
  if (chatGroup === null) {
    return notFound();
  }
  const chatGroupUsers: Array<GroupChatUserType> | [] = await fetchChatGroupUsers(id);
  const chats: Array<MessageType> | [] = await fetchChats(id);

  return (
    <div>
      <ChatBase group={chatGroup} users={chatGroupUsers} oldMessages={chats} />
    </div>
  );
}
