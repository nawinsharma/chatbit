"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { PlusIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createChatSchema,
  createChatSchemaType,
} from "@/zod/chatSchema";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { clearCache } from "@/actions/revalidateCache";
import Env from "@/lib/env";

export default function CreateChat({ onSuccess }: { onSuccess?: () => Promise<void> }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<createChatSchemaType>({
    resolver: zodResolver(createChatSchema),
  });
  
  const onSubmit = async (payload: createChatSchemaType) => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${Env.BACKEND_URL}/api/chat-group`, payload, {
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
        reset();
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong. Please try again!");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <PlusIcon size={20} />
          Create Room
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create your new Chat</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <Input placeholder="Enter chat title" {...register("title")} />
            <span className="text-red-400">{errors.title?.message}</span>
          </div>
          <div className="mt-4">
            <Input placeholder="Enter passcode" {...register("passcode")} />
            <span className="text-red-400">{errors.passcode?.message}</span>
          </div>
          <div className="mt-4">
            <Button className="w-full" disabled={loading}>
              {loading ? "Processing.." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
