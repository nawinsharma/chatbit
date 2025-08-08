import { useState, useEffect, useRef, useCallback } from 'react';
import { getSocket } from '@/lib/socket.config';

interface UseTypingIndicatorProps {
  roomId: string;
  userName?: string;
  isConnected: boolean;
}

const MAX_TYPING_USERS_DISPLAY = 20; // Limit for client-side display

export function useTypingIndicator({ roomId, userName, isConnected }: UseTypingIndicatorProps) {
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const socketRef = useRef(getSocket({ room: roomId }));

  // Debounced function to stop typing indicator
  const stopTyping = useCallback(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    typingTimeoutRef.current = setTimeout(() => {
      if (isTyping && userName && isConnected) {
        setIsTyping(false);
        socketRef.current.emit('typing_stop', { name: userName });
      }
    }, 1000); // Stop typing indicator after 1 second of no input
  }, [isTyping, userName, isConnected]);

  // Start typing indicator
  const startTyping = useCallback(() => {
    if (!isTyping && userName && isConnected) {
      setIsTyping(true);
      socketRef.current.emit('typing_start', { name: userName });
    }
    
    // Reset the timeout
    stopTyping();
  }, [isTyping, userName, isConnected, stopTyping]);

  // Handle typing events from other users
  useEffect(() => {
    const socket = socketRef.current;

    const handleTypingStart = (data: { name: string }) => {
      console.log('⌨️ User started typing:', data);
      setTypingUsers(prev => {
        // Prevent duplicate entries
        if (prev.includes(data.name)) {
          return prev;
        }
        
        // Limit the number of typing users to prevent UI clutter
        const newTypingUsers = [...prev, data.name];
        if (newTypingUsers.length > MAX_TYPING_USERS_DISPLAY) {
          console.log(`⚠️ Typing users display limit reached (${MAX_TYPING_USERS_DISPLAY})`);
          return newTypingUsers.slice(0, MAX_TYPING_USERS_DISPLAY);
        }
        
        return newTypingUsers;
      });
    };

    const handleTypingStop = (data: { name: string }) => {
      console.log('⌨️ User stopped typing:', data);
      setTypingUsers(prev => prev.filter(name => name !== data.name));
    };

    if (isConnected) {
      socket.on('typing_start', handleTypingStart);
      socket.on('typing_stop', handleTypingStop);
    }

    return () => {
      socket.off('typing_start', handleTypingStart);
      socket.off('typing_stop', handleTypingStop);
    };
  }, [isConnected]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return {
    typingUsers,
    startTyping,
    stopTyping,
    isTyping
  };
} 