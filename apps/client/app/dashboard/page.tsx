"use client";

import CreateChat from "@/components/chatGroup/CreateChat";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { fetchChatGroups } from "@/fetch/groupFetch";
import GroupChatCard from "@/components/chatGroup/GroupChatCard";
import { GroupChatType } from "@/type";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { AnimationContainer, MaxWidthWrapper } from "@/components/global";
import { MessageSquareIcon } from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [groups, setGroups] = useState<GroupChatType[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isRefreshingRef = useRef(false);

  // Function to refresh groups data
  const refreshGroups = useCallback(async () => {
    if (session && !isRefreshingRef.current) {
      isRefreshingRef.current = true;
      setIsRefreshing(true);
      try {
        const data = await fetchChatGroups();
        setGroups(data);
      } catch (error) {
        console.error("Failed to refresh groups:", error);
      } finally {
        isRefreshingRef.current = false;
        setIsRefreshing(false);
      }
    }
  }, [session]);

  // Function to load groups
  const loadGroups = useCallback(async () => {
    if (session) {
      const data = await fetchChatGroups();
      setGroups(data);
    }
  }, [session]);

  useEffect(() => {
    if (!session && !isPending) {
      router.push("/sign-in");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    loadGroups();
  }, [loadGroups]);

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
        <div className="py-8 sm:py-13">
          <AnimationContainer delay={0.1}>
            <div className="text-center space-y-4 px-4 sm:px-0">
              {/* <MagicBadge title="Dashboard" /> */}
              <h1 className="!leading-[1.15] text-balance font-heading font-medium text-2xl sm:text-4xl text-foreground tracking-normal md:text-5xl lg:text-6xl">
                Welcome, {" "}
                <span className="inline-block text-blue-600 dark:text-blue-400">
                  {session?.user.name}
                </span>
              </h1>
              <p className="text-balance text-base sm:text-lg text-muted-foreground tracking-tight md:text-xl max-w-2xl mx-auto px-4 sm:px-0">
                Manage your chat rooms, create new conversations, and stay connected with your teams.
              </p>
            </div>
          </AnimationContainer>
        </div>
      </MaxWidthWrapper>

      {/* Chat Groups Section */}
      <MaxWidthWrapper>
        <AnimationContainer delay={0.2}>
          <div className="pb-12 sm:pb-20 px-4 sm:px-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-8 sm:mb-12">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-foreground">
                  Your Chat Rooms
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {groups.length === 0 
                    ? "No chat rooms yet"
                    : `You have ${groups.length} active chat room${groups.length === 1 ? '' : 's'}`
                  }
                </p>
              </div>
              <div className="flex justify-center sm:justify-end">
                <CreateChat onSuccess={refreshGroups} />
              </div>
            </div>

            {groups.length === 0 ? (
              <div className="text-center py-12 sm:py-20 px-4">
                <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 bg-muted rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <MessageSquareIcon className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                  No chat rooms yet
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-6 max-w-md mx-auto">
                  Create your first chat room to start connecting with your team. 
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
