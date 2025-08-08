import React, { Dispatch, SetStateAction, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { toast } from "sonner";
import { clearCache } from "@/actions/revalidateCache";

export default function DeleteChatGroup({
  open,
  setOpen,
  groupId,
  onSuccess,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  groupId: string;
  onSuccess?: () => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);
  const deleteChatGroup = async () => {
    setLoading(true);
    try {
      const { data } = await axios.delete(`/api/chat-group/${groupId}`, {
        withCredentials: true,
      });
      if (data?.message) {
        // Clear cache and refresh data
        clearCache("dashboard");
        if (onSuccess) {
          await onSuccess();
        }
        toast.success(data?.message);
        setOpen(false);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong.please try again later.");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="w-[90vw] max-w-md sm:max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg sm:text-xl">Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-sm sm:text-base">
            This action cannot be undone. This will permanently delete your chat
            group and its conversations.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
          <AlertDialogCancel className="w-full sm:w-auto text-sm sm:text-base">Cancel</AlertDialogCancel>
          <AlertDialogAction 
            disabled={loading} 
            onClick={deleteChatGroup}
            className="w-full sm:w-auto text-sm sm:text-base"
          >
            {loading ? "Processing.." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
