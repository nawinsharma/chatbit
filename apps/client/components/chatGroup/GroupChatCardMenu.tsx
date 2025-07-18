"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { CustomUser } from "@/lib/types";
import { GroupChatType } from "@/type";
import EditGroupChat from "./EditGroupChat";
import DeleteChatGroup from "./DeleteChatGroup";
import { toast } from "sonner";

export default function GroupChatCardMenu({
  group,
  user,
}: {
  group: GroupChatType;
  user: CustomUser;
}) {
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [editDialoag, setEditDialog] = useState(false);

  const handleCopy = () => {
    const url = `${window.location.origin}/chat/${group.id}`;
    navigator.clipboard?.writeText(url);
    toast.success("Link copied successfully!");
  };

  const handleGoToChat = () => {
    window.location.href = `/chat/${group.id}`;
  };

  return (
    <>
      {deleteDialog && (
        <DeleteChatGroup
          open={deleteDialog}
          setOpen={setDeleteDialog}
          groupId={group.id}
          token={user.token!}
        />
      )}
      {editDialoag && (
        <EditGroupChat
          open={editDialoag}
          setOpen={setEditDialog}
          user={user}
          group={group}
        />
      )}

      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical className="h-5 w-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleCopy}>Copy Link</DropdownMenuItem>
          <DropdownMenuItem onClick={handleGoToChat}>Go to Chat</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setEditDialog(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDeleteDialog(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
