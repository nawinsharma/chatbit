"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useParams } from "next/navigation";
import axios from "axios";
import { GroupChatType, GroupChatUserType } from "@/type";
import { toast } from "sonner";
import Env from "@/lib/env";
import { MessageSquareIcon, KeyIcon, UserIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { getSocket } from "@/lib/socket.config";

export default function ChatUserDialog({
  open,
  setOpen,
  group,
  onUserJoined,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  group: GroupChatType;
  onUserJoined?: () => void;
}) {
  const params = useParams();
  const { data: session } = authClient.useSession();
  const [state, setState] = useState({
    name: "",
    passcode: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingCreator, setIsCheckingCreator] = useState(true);

  // Check if user is authenticated and is the room creator
  useEffect(() => {
    const checkUserAccess = async () => {
      setIsCheckingCreator(true);
      
      // First check localStorage for existing room data
      const data = localStorage.getItem(params["id"] as string);
      if (data) {
        const jsonData = JSON.parse(data);
        if (jsonData?.name && jsonData?.group_id) {
          setOpen(false);
          setIsCheckingCreator(false);
          onUserJoined?.(); // Notify parent that user is already joined
          return;
        }
      }

      // If user is authenticated and is the room creator, auto-join them
      if (session?.user && session.user.id === group.user_id) {
        const userName = session.user.name || session.user.email || 'Room Creator';
        
        try {
          // Create/update the user entry for this room
          const { data: responseData } = await axios.post(`/api/chat-group-user`, {
            name: userName,
            group_id: params["id"] as string,
          }, {
            withCredentials: true,
          });
          
          // Store in localStorage
          localStorage.setItem(
            params["id"] as string,
            JSON.stringify(responseData?.data)
          );
          
          toast.success(`Welcome to ${group.title}!`);
          setOpen(false);
          onUserJoined?.(); // Notify parent that user joined
        } catch (error: unknown) {
          // Handle 409 Conflict (user already exists)
          if (axios.isAxiosError(error) && error.response?.status === 409) {
            console.log("User already exists in group, retrieving existing data");
            try {
              // Try to get the existing user data
              const { data: usersData } = await axios.get(`/api/chat-group-user?group_id=${params["id"] as string}`, {
                withCredentials: true,
              });
              
              // Find the existing user by name
              const existingUser = usersData?.data?.find((user: GroupChatUserType) => 
                user.name.toLowerCase().trim() === userName.toLowerCase().trim()
              );
              
              if (existingUser) {
                // Store existing user data in localStorage
                localStorage.setItem(
                  params["id"] as string,
                  JSON.stringify(existingUser)
                );
                
                toast.success(`Welcome to ${group.title}!`);
                setOpen(false);
                onUserJoined?.(); // Notify parent that user joined
              } else {
                console.error("User not found in group despite 409 error");
                // Fall back to the dialog
              }
            } catch (retrieveError) {
              console.error("Failed to retrieve existing user data:", retrieveError);
              // Fall back to the dialog
            }
          } else {
            console.error("Auto-join failed:", error);
            // If auto-join fails, fall back to the dialog
          }
        }
      }
      
      setIsCheckingCreator(false);
    };

    checkUserAccess();
  }, [params, setOpen, session, group.user_id, group.title, onUserJoined]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!state.name.trim() || !state.passcode.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    if (group.passcode !== state.passcode) {
      toast.error("Incorrect passcode. Please try again.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { data } = await axios.post(`/api/chat-group-user`, {
        name: state.name.trim(),
        group_id: params["id"] as string,
      }, {
        withCredentials: true,
      });
      
      console.log("API response data:", data);
      console.log("Storing user data in localStorage:", data?.data);
      
      // Always store the latest user data
      localStorage.setItem(
        params["id"] as string,
        JSON.stringify(data?.data)
      );
      
      // Emit socket event to notify other users immediately
      try {
        const socket = getSocket({ room: params["id"] as string });
        socket.emit('user_joined', {
          user: data?.data,
          group_id: params["id"] as string,
          timestamp: new Date().toISOString()
        });
        console.log("📤 Emitted user_joined event from frontend");
      } catch (socketError) {
        console.error("Failed to emit socket event from frontend:", socketError);
      }
      
      toast.success(`Welcome to ${group.title}!`);
      setOpen(false);
      onUserJoined?.(); // Notify parent that user joined
    } catch (error) {
      toast.error("Failed to join the chat. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state while checking if user is creator
  if (isCheckingCreator) {
    return (
      <Dialog open={open} onOpenChange={() => {}}>
        <DialogContent 
          className="sm:max-w-md"
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="sr-only">Checking Access</DialogTitle>
            <DialogDescription className="sr-only">
              Verifying your access to this chat room
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="text-muted-foreground">Checking access...</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent 
        className="sm:max-w-md"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader className="text-center">
          <div className="flex flex-col items-center gap-4 mb-2">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 dark:bg-blue-500 text-white shadow-lg">
              <MessageSquareIcon className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <DialogTitle className="text-2xl font-heading font-semibold text-foreground">
                Join {group.title}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Enter your details to start chatting with the team.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <UserIcon className="h-4 w-4" />
              Your Name
            </label>
            <Input
              placeholder="Enter your display name"
              value={state.name}
              onChange={(e) => setState({ ...state, name: e.target.value })}
              className="h-11"
              maxLength={50}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <KeyIcon className="h-4 w-4" />
              Room Passcode
            </label>
            <Input
              type="password"
              placeholder="Enter the room passcode"
              value={state.passcode}
              onChange={(e) => setState({ ...state, passcode: e.target.value })}
              className="h-11"
            />
            <p className="text-xs text-muted-foreground">
              Ask the room creator for the passcode if you don&apos;t have it.
            </p>
          </div>
          
          <Button
            type="submit"
            className="w-full h-11 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300"
            disabled={isSubmitting || !state.name.trim() || !state.passcode.trim()}
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Joining...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <MessageSquareIcon className="h-4 w-4" />
                <span>Join Chat Room</span>
              </div>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
