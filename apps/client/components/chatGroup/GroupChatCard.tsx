import React from "react";
import { CustomUser } from "@/lib/types";
import { GroupChatType } from "@/type";
import GroupChatCardMenu from "./GroupChatCardMenu";
import { useRouter } from "next/navigation";

export default function GroupChatCard({
  group,
  user,
}: {
  group: GroupChatType;
  user: CustomUser;
}) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/chat/${group.id}`);
  };
  return (
    <div
      onClick={handleClick}
      className="cursor-pointer transition-transform hover:scale-105 active:scale-100 rounded-2xl p-6 shadow-xl bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 hover:shadow-2xl glass-card relative"
      style={{
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
      }}
    >
      {/* Three-dot menu at top right, stop propagation so it doesn't trigger navigation */}
      <div className="absolute top-3 right-3 z-10" onClick={e => e.stopPropagation()}>
        <GroupChatCardMenu group={group} user={user} />
      </div>
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-2xl font-bold text-center mb-2 text-black/90 drop-shadow">{group.title}</h2>
        <div className="w-full flex flex-col items-center">
          <span className="text-blue-600 font-semibold">Passcode:</span>
          <span className="text-lg font-mono text-black/80">{group.passcode}</span>
        </div>
        <div className="w-full text-center mt-2 text-xs text-black/60">
          Created At: <span suppressHydrationWarning={true}>{new Date(group.created_at).toDateString()}</span>
        </div>
      </div>
    </div>
  );
}
