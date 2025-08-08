import React from "react";
import { CustomUser } from "@/lib/types";
import { GroupChatType } from "@/type";
import GroupChatCardMenu from "./GroupChatCardMenu";
import { useRouter } from "next/navigation";
import { UsersIcon, KeyIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function GroupChatCard({
  group,
  user,
  onUpdate,
  onDelete,
}: {
  group: GroupChatType;
  user: CustomUser;
  onUpdate?: () => Promise<void>;
  onDelete?: () => Promise<void>;
}) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/chat/${group.id}`);
  };
  
  return (
    <div
      onClick={handleClick}
      className={cn(
        "group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-xl border border-border/60 cursor-pointer",
        "bg-card dark:bg-card hover:bg-card/80 dark:hover:bg-card/80 [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] transition-all duration-300",
        "hover:scale-[1.02] hover:shadow-lg hover:border-border"
      )}
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Menu button */}
      <div 
        className="absolute top-2 right-2 sm:top-3 sm:right-3 z-30 opacity-60 hover:opacity-100 group-hover:opacity-100 transition-opacity duration-200 sm:opacity-0 sm:group-hover:opacity-100" 
        onClick={e => e.stopPropagation()}
      >
        <GroupChatCardMenu 
          group={group} 
          user={user} 
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      </div>

      {/* Card content */}
      <div className="relative z-10 p-4 sm:p-6 space-y-3 sm:space-y-4">
        {/* Header with icon */}
        <div className="flex items-center space-x-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base sm:text-lg text-card-foreground truncate group-hover:text-foreground transition-colors">
              {group.title}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Chat Room
            </p>
          </div>
        </div>

        {/* Passcode section */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
            <KeyIcon className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>Access Code</span>
          </div>
          <div className="bg-muted/50 rounded-lg p-2 sm:p-3 border border-border/50">
            <span className="font-mono text-xs sm:text-sm font-medium text-foreground tracking-wider break-all">
              {group.passcode}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
            <UsersIcon className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>Active</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Created {new Date(group.created_at).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric' 
            })}
          </div>
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="pointer-events-none absolute inset-0 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-violet-500/5 group-hover:to-fuchsia-500/5" />
    </div>
  );
}
