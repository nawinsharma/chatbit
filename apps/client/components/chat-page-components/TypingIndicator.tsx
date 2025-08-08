import React from "react";
import { LoaderIcon } from "lucide-react";

interface TypingIndicatorProps {
  typingUsers: string[];
  currentUserName?: string;
}

export default function TypingIndicator({ typingUsers, currentUserName }: TypingIndicatorProps) {
  // Filter out current user from typing indicators
  const otherTypingUsers = typingUsers.filter(name => name !== currentUserName);
  
  if (otherTypingUsers.length === 0) {
    return null;
  }

  const getTypingMessage = (users: string[]) => {
    if (users.length === 1) {
      return `${users[0]} is typing...`;
    } else if (users.length === 2) {
      return `${users[0]} and ${users[1]} are typing...`;
    } else if (users.length === 3) {
      return `${users[0]}, ${users[1]}, and ${users[2]} are typing...`;
    } else if (users.length <= 5) {
      // Show up to 5 names for small groups
      const lastUser = users[users.length - 1];
      const otherUsers = users.slice(0, -1);
      return `${otherUsers.join(', ')}, and ${lastUser} are typing...`;
    } else {
      // For large groups, show first 3 names + count
      const firstSix = users.slice(0, 6);
      const remainingCount = users.length - 6;
      return `${firstSix.join(', ')}, and ${remainingCount} others are typing...`;
    }
  };

  return (
    <div className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground animate-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center gap-1">
        <LoaderIcon className="h-3 w-3 animate-spin" />
        <span className="italic">{getTypingMessage(otherTypingUsers)}</span>
        {otherTypingUsers.length > 5 && (
          <span className="text-xs opacity-75">({otherTypingUsers.length} total)</span>
        )}
      </div>
    </div>
  );
} 