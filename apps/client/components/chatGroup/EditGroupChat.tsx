"use client";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createChatSchema,
  createChatSchemaType,
} from "@/zod/chatSchema";
import { CustomUser } from "@/lib/types";
import { GroupChatType } from "@/type";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { clearCache } from "@/actions/revalidateCache";

export default function EditGroupChat({
  user,
  group,
  open,
  setOpen,
  onSuccess,
}: {
  user: CustomUser;
  group: GroupChatType;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSuccess?: () => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<createChatSchemaType>({
    resolver: zodResolver(createChatSchema),
  });

  useEffect(() => {
    setValue("title", group.title);
    setValue("passcode", group.passcode);
  }, [group, setValue]);

  const onSubmit = async (payload: createChatSchemaType) => {
    try {
      setLoading(true);
      const { data } = await axios.put(`/api/chat-group/${group.id}`, payload, {
        headers: {
          Authorization: user.token,
        },
        withCredentials: true,
      });

      if (data?.message) {
        setOpen(false);
        toast.success(data?.message);
        // Clear cache and refresh data
        clearCache("dashboard");
        if (onSuccess) {
          await onSuccess();
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong.please try again!");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[90vw] max-w-md sm:max-w-lg" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">Update group chat</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input 
              placeholder="Enter chat title" 
              {...register("title")} 
              className="text-sm sm:text-base"
            />
            {errors.title && (
              <span className="text-red-400 text-xs sm:text-sm mt-1 block">{errors.title.message}</span>
            )}
          </div>
          <div>
            <Input 
              placeholder="Enter passcode" 
              {...register("passcode")} 
              className="text-sm sm:text-base"
            />
            {errors.passcode && (
              <span className="text-red-400 text-xs sm:text-sm mt-1 block">{errors.passcode.message}</span>
            )}
          </div>
          <div>
            <Button 
              className="w-full text-sm sm:text-base py-2 sm:py-3" 
              disabled={loading}
            >
              {loading ? "Processing.." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
