import React, { useEffect, useMemo, useRef, useState } from "react";
import { getSocket } from "@/lib/socket.config";
import { v4 as uuidv4 } from "uuid";
import { GroupChatUserType } from "@/type";
import { MessageType } from "@/type";
import { GroupChatType } from "@/type";
import { fetchChats } from "@/fetch/chatsFetch";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { SendIcon, LoaderIcon } from "lucide-react";
import { EmojiPicker } from "../ui/emoji-picker";
import TypingIndicator from "./TypingIndicator";
import { useTypingIndicator } from "@/hooks/useTypingIndicator";

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
  const [isConnected, setIsConnected] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const socket = useMemo(() => {
    const socket = getSocket({
      room: group.id,
    });
    
    // Add connection status tracking
    socket.on("connect", () => {
      console.log("Socket connected successfully");
      setIsConnected(true);
    });
    
    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      setIsConnected(false);
    });
    
    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
      setIsConnected(false);
    });
    
    return socket;
  }, [group.id]);

  // Initialize typing indicator hook
  const { typingUsers, startTyping, stopTyping } = useTypingIndicator({
    roomId: group.id,
    userName: chatUser?.name,
    isConnected
  });

  useEffect(() => {
    setLoading(true);
    fetchChats(group.id)
      .then((msgs) => setMessages(msgs))
      .finally(() => setLoading(false));
  }, [group.id]);

  // Connect to socket when component mounts or group changes
  useEffect(() => {
    if (socket && !socket.connected) {
      console.log("Connecting to socket...");
      socket.connect();
    }
  }, [socket]);

  useEffect(() => {
    socket.on("message", (data: MessageType) => {
      console.log("Received message from server:", data);
      
      // Check if this message already exists (to avoid duplicates from optimistic updates)
      setMessages((prevMessages) => {
        const exists = prevMessages.some(msg => 
          msg.id === data.id || 
          (msg.message === data.message && 
           msg.name === data.name && 
           Math.abs(new Date(msg.created_at).getTime() - new Date(data.created_at).getTime()) < 5000) // Within 5 seconds
        );
        if (exists) {
          console.log("Message already exists, skipping duplicate");
          return prevMessages;
        }
        return [...prevMessages, data];
      });
      scrollToBottom();
    });

    // Listen for room join confirmation
    socket.on("joined_room", (data) => {
      console.log("✅ Successfully joined room:", data);
      setIsConnected(true);
    });

    // Handle connection events
    socket.on("connect", () => {
      console.log("✅ Socket connected, setting connected state");
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("🔌 Socket disconnected, setting disconnected state");
      setIsConnected(false);
    });

    return () => {
      socket.off("message");
      socket.off("joined_room");
      socket.off("connect");
      socket.off("disconnect");
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!message.trim() || isSending) return;

    if (!isConnected) {
      console.error("Socket not connected, cannot send message");
      // Try to reconnect
      socket.connect();
      return;
    }

    setIsSending(true);
    const payload: MessageType = {
      id: uuidv4(),
      message: message.trim(),
      name: chatUser?.name ?? "Unknown",
      created_at: new Date().toISOString(),
      group_id: group.id,
    };
    
    console.log("chatUser when sending message:", chatUser);
    console.log("Using name:", chatUser?.name ?? "Unknown");
    
    try {
      console.log("Sending message:", payload);
      
      // Stop typing indicator when sending message
      stopTyping();
      
      // Optimistic update - add immediately for better UX
      setMessages(prevMessages => [...prevMessages, payload]);
      
      // Clear input immediately
      setMessage("");
      
      // Emit the message
      socket.emit("message", payload);
      
      // Add a timeout to detect if message fails
      setTimeout(() => {
        setIsSending(false);
      }, 1000);
      
    } catch (error) {
      console.error("Failed to send message:", error);
      setIsSending(false);
      
      // Remove the optimistic message if sending failed
      setMessages(prevMessages => 
        prevMessages.filter(msg => msg.id !== payload.id)
      );
      
      // Restore the message in input
      setMessage(payload.message);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setMessage(newValue);
    
    // Trigger typing indicator
    if (newValue.trim()) {
      startTyping();
    } else {
      stopTyping();
    }
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEmojiSelect = (emoji: any) => {
    const newMessage = message + emoji.native;
    setMessage(newMessage);
    
    // Trigger typing indicator when emoji is added
    if (newMessage.trim()) {
      startTyping();
    }
  };

  const groupMessagesByDate = (messages: MessageType[]) => {
    const grouped: { [key: string]: MessageType[] } = {};
    
    messages.forEach(msg => {
      const date = new Date(msg.created_at).toDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(msg);
    });
    
    return grouped;
  };

  const isToday = (date: string) => {
    return new Date(date).toDateString() === new Date().toDateString();
  };

  const isYesterday = (date: string) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return new Date(date).toDateString() === yesterday.toDateString();
  };

  const formatDateHeader = (date: string) => {
    if (isToday(date)) return "Today";
    if (isYesterday(date)) return "Yesterday";
    return new Date(date).toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6">
        {loading ? (
          <div className="flex-1 flex items-center justify-center py-12">
            <div className="flex items-center gap-3 text-muted-foreground">
              <LoaderIcon className="h-5 w-5 animate-spin" />
              <span>Loading messages...</span>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center py-12 text-center">
            <div className="space-y-3">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <SendIcon className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground">
                Start the conversation
              </h3>
              <p className="text-muted-foreground max-w-sm">
                Send a message to begin chatting with your team members.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedMessages).map(([date, msgs]) => (
              <div key={date}>
                {/* Date header */}
                <div className="flex items-center justify-center py-2">
                  <div className="bg-muted/50 rounded-full px-3 py-1">
                    <span className="text-xs font-medium text-muted-foreground">
                      {formatDateHeader(date)}
                    </span>
                  </div>
                </div>
                
                {/* Messages for this date */}
                <div className="space-y-4">
                  {msgs.map((msg, index) => {
                    const isOwn = msg.name === chatUser?.name;
                    const showAvatar = index === 0 || msgs[index - 1]?.name !== msg.name;
                    
                    return (
                      <div
                        key={msg.id}
                        className={`flex items-end gap-3 ${isOwn ? "flex-row-reverse" : ""}`}
                      >
                        {/* Avatar */}
                        <div className={`${showAvatar ? "opacity-100" : "opacity-0"} transition-opacity`}>
                          <Avatar className="h-10 w-10 ring-2 ring-gray-200 dark:ring-gray-600">
                            <AvatarFallback className={`text-sm font-semibold ${
                              isOwn 
                                ? "bg-blue-500 text-white" 
                                : "bg-gray-200 text-gray-700 dark:text-gray-300 dark:bg-[rgb(14,14,14)] dark:border-[rgb(14,14,14)]"
                            }`}>
                              {msg.name ? msg.name.charAt(0).toUpperCase() : '?'}
                            </AvatarFallback>
                          </Avatar>
                        </div>

                        {/* Message bubble */}
                        <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${isOwn ? "text-right" : ""}`}>
                          {showAvatar && !isOwn && (
                            <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 px-1">
                              {msg.name}
                            </div>
                          )}
                          
                          <div
                            className={`rounded-2xl px-4 py-3 shadow-sm transition-all duration-200 ${
                              isOwn
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 dark:bg-[rgb(14,14,14)] text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-[rgb(14,14,14)]"
                            }`}
                          >
                            <div className="break-words whitespace-pre-wrap text-sm leading-relaxed">
                              {msg.message}
                            </div>
                            <div className={`text-[10px] mt-1 ${
                              isOwn ? "text-white/70" : "text-gray-500"
                            }`}>
                              {new Date(msg.created_at).toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Typing Indicator */}
      <TypingIndicator 
        typingUsers={typingUsers} 
        currentUserName={chatUser?.name} 
      />

      {/* Message Input */}
      <div className="border-t border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30 p-4">
        {/* Connection Status */}
        {!isConnected && (
          <div className="mb-3 px-3 py-2 bg-yellow-100 dark:bg-yellow-900 border border-yellow-300 dark:border-yellow-700 rounded-lg">
            <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200 text-sm">
              <LoaderIcon className="h-4 w-4 animate-spin" />
              <span>Connecting to chat server...</span>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="flex items-end gap-3">
          <div className="flex-1 relative">
            <textarea
              placeholder="Type a message..."
              value={message}
              onChange={handleMessageChange}
              onKeyDown={handleKeyPress}
              className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 pr-16 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500/50 transition-all duration-200"
              rows={1}
              style={{
                minHeight: '44px',
                maxHeight: '120px',
                height: 'auto',
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = target.scrollHeight + 'px';
              }}
            />
            <div className="absolute right-3 bottom-3">
              <EmojiPicker 
                onEmojiSelect={handleEmojiSelect}
                className="z-10"
                buttonClassName="h-10 w-10 p-0 hover:bg-muted/50 transition-colors bg-muted/30 hover:bg-muted/60 rounded-lg"
              />
            </div>
          </div>
          <Button
            type="submit"
            size="sm"
            disabled={!message.trim() || isSending || !isConnected}
            className="h-11 w-11 shrink-0 rounded-xl bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            title={!isConnected ? "Connecting..." : isSending ? "Sending..." : "Send message"}
          >
            {isSending ? (
              <LoaderIcon className="h-4 w-4 animate-spin" />
            ) : (
              <SendIcon className="h-4 w-4" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
