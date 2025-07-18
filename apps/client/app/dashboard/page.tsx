"use client";

import CreateChat from "@/components/chatGroup/CreateChat";
import DashNav from "@/components/chatGroup/DashNav";
import React, { useEffect, useState } from "react";
import { fetchChatGroups } from "@/fetch/groupFetch";
import GroupChatCard from "@/components/chatGroup/GroupChatCard";
import { GroupChatType } from "@/type";
import { redirect, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function dashboard() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [groups, setGroups] = useState<GroupChatType[]>([]);

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
    return <div>Loading...</div>;
  }
  const token = session?.session?.token || '';
  const user = session?.user
    ? { ...session.user, token }
    : { id: '', name: '', email: '', emailVerified: false, createdAt: new Date(), updatedAt: new Date(), image: null, token: '' };


  return (
    <div>
      <DashNav
        name={session?.user.name!}
        image={session?.user.image ?? undefined}
      />
      <div className="container">
        <div className="mt-6 text-end">
          <CreateChat />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {groups.length > 0 &&
            groups.map((item, index) => (
              <GroupChatCard group={item} key={index} user={user} />
            ))}
        </div>
      </div>
    </div>
  );
}
