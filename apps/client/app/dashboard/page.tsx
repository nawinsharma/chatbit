"use client";

import CreateChat from "@/components/chatGroup/CreateChat";
import React, { useEffect, useState, useCallback } from "react";
import { fetchChatGroups } from "@/fetch/groupFetch";
import GroupChatCard from "@/components/chatGroup/GroupChatCard";
import { GroupChatType } from "@/type";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { AnimationContainer, MaxWidthWrapper } from "@/components/global";
import MagicBadge from "@/components/ui/magic-badge";
import { MessageSquareIcon } from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [groups, setGroups] = useState<GroupChatType[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Function to refresh groups data
  const refreshGroups = useCallback(async () => {
    if (session && !isRefreshing) {
      setIsRefreshing(true);
      try {
        const data = await fetchChatGroups();
        setGroups(data);
      } catch (error) {
        console.error("Failed to refresh groups:", error);
      } finally {
        setIsRefreshing(false);
      }
    }
  }, [session, isRefreshing]);

  useEffect(() => {
    if (!session && !isPending) {
      router.push("/sign-in");
    }
  }, [session, isPending]);

  useEffect(() => {
    async function loadGroups() {
      if (session) {
        const data = await fetchChatGroups();
        setGroups(data);
      }
    }
    loadGroups();
  }, [session]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const token = session?.session?.token || '';
  const user = session?.user
    ? { ...session.user, token }
    : { id: '', name: '', email: '', emailVerified: false, createdAt: new Date(), updatedAt: new Date(), image: null, token: '' };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <MaxWidthWrapper>
        <div className="py-13">
          <AnimationContainer delay={0.1}>
            <div className="text-center space-y-4">
              {/* <MagicBadge title="Dashboard" /> */}
              <h1 className="!leading-[1.15] text-balance font-heading font-medium text-4xl text-foreground tracking-normal sm:text-5xl md:text-6xl">
                Welcome back, {" "}
                <span className="inline-block bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                  {session?.user.name}
                </span>
              </h1>
              <p className="text-balance text-lg text-muted-foreground tracking-tight md:text-xl max-w-2xl mx-auto">
                Manage your chat rooms, create new conversations, and stay connected with your teams.
              </p>
            </div>
          </AnimationContainer>
        </div>
      </MaxWidthWrapper>

      {/* Chat Groups Section */}
      <MaxWidthWrapper>
        <AnimationContainer delay={0.2}>
          <div className="pb-20">
            <div className="flex items-center justify-between mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-heading font-semibold text-foreground">
                  Your Chat Rooms
                </h2>
                <p className="text-muted-foreground">
                  {groups.length === 0 
                    ? "You haven't created any chat rooms yet. Start by creating your first one!"
                    : `You have ${groups.length} active chat room${groups.length === 1 ? '' : 's'}`
                  }
                </p>
              </div>
              <CreateChat onSuccess={refreshGroups} />
            </div>

            {groups.length === 0 ? (
              <div className="text-center py-20">
                <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
                  <MessageSquareIcon className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No chat rooms yet
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Create your first chat room to start connecting with your team. 
                  It takes less than 30 seconds to get started.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groups.map((item, index) => (
                  <AnimationContainer delay={0.1 * index} key={item.id}>
                    <GroupChatCard group={item} user={user} onUpdate={refreshGroups} onDelete={refreshGroups} />
                  </AnimationContainer>
                ))}
              </div>
            )}
          </div>
        </AnimationContainer>
      </MaxWidthWrapper>
    </div>
  );
}
