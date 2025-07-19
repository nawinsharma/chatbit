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
import { Button } from "@/components/ui/button";

export default function GroupChatCardMenu({
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
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/chat/${group.id}`;
    navigator.clipboard?.writeText(url);
    toast.success("Link copied successfully!");
  };

  const handleGoToChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `/chat/${group.id}`;
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditDialog(true);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteDialog(true);
  };

  return (
    <>
      {deleteDialog && (
        <DeleteChatGroup
          open={deleteDialog}
          setOpen={setDeleteDialog}
          groupId={group.id}
          token={user.token!}
          onSuccess={onDelete}
        />
      )}
      {editDialog && (
        <EditGroupChat
          open={editDialog}
          setOpen={setEditDialog}
          user={user}
          group={group}
          onSuccess={onUpdate}
        />
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 hover:bg-muted/80 rounded-md transition-colors relative z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="z-50">
          <DropdownMenuItem onClick={handleCopy}>Copy Link</DropdownMenuItem>
          <DropdownMenuItem onClick={handleGoToChat}>Go to Chat</DropdownMenuItem>
          <DropdownMenuItem onClick={handleEdit}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
