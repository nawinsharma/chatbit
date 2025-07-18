import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { getSocket } from "@/lib/socket.config";
import { Input } from "../ui/input";
import { v4 as uuidv4 } from "uuid";
import { GroupChatUserType } from "@/type";
import { MessageType } from "@/type";
import { GroupChatType } from "@/type";
import { fetchChats } from "@/fetch/chatsFetch";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";

export default function Chats({
  group,
  oldMessages,
  chatUser,
}: {
  group: GroupChatType;
  oldMessages: Array<MessageType> | [];
  chatUser?: GroupChatUserType;
}) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<MessageType>>(oldMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  let socket = useMemo(() => {
    const socket = getSocket();
    socket.auth = {
      room: group.id,
    };
    return socket.connect();
  }, []);
  useEffect(() => {
    setLoading(true);
    fetchChats(group.id)
      .then((msgs) => setMessages(msgs))
      .finally(() => setLoading(false));
  }, [group.id]);
  useEffect(() => {
    socket.on("message", (data: MessageType) => {
      console.log("The message is", data);
      setMessages((prevMessages) => [...prevMessages, data]);
      scrollToBottom();
    });

    return () => {
      socket.close();
    };
  }, []);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const payload: MessageType = {
      id: uuidv4(),
      message: message,
      name: chatUser?.name ?? "Unknown",
      created_at: new Date().toISOString(),
      group_id: group.id,
    };
    socket.emit("message", payload);
    setMessage("");
    setMessages([...messages, payload]);
  };

  return (
    <div className="flex flex-col h-full p-4 bg-gradient-to-b from-white to-blue-50 rounded-lg shadow-inner">
      {loading ? (
        <div className="flex-1 flex items-center justify-center text-lg text-gray-500">Loading messages...</div>
      ) : (
        <div className="flex-1 overflow-y-auto flex flex-col-reverse">
          <div ref={messagesEndRef} />
          <div className="flex flex-col gap-3">
            {messages.map((message) => {
              const isOwn = message.name === chatUser?.name;
              return (
                <div
                  key={message.id}
                  className={`flex items-end gap-2 ${isOwn ? "self-end flex-row-reverse" : "self-start"}`}
                >
                  <Avatar className="h-8 w-8 border-2 border-blue-200">
                    <AvatarFallback className="bg-blue-100 text-blue-700 font-bold">
                      {message.name ? message.name.charAt(0) : '?'}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`max-w-xs rounded-2xl px-4 py-2 shadow-md ${
                    isOwn
                      ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white"
                      : "bg-gradient-to-r from-gray-200 to-gray-100 text-gray-900"
                  }`}>
                    <div className="text-xs font-semibold mb-1 opacity-80">
                      {message.name}
                    </div>
                    <div className="break-words whitespace-pre-line text-sm">{message.message}</div>
                    <div className="text-[10px] text-right mt-1 opacity-60">
                      {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2 bg-white rounded-xl shadow px-3 py-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          className="flex-1 p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit" size="sm" className="ml-2 px-4" disabled={!message.trim()}>
          Send
        </Button>
      </form>
    </div>
  );
}
