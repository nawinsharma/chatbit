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
import { createChatSchema, createChatSchemaType } from "@/zod/chatSchema";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { clearCache } from "@/actions/revalidateCache";
import Env from "@/lib/env";
import { ShimmerButton } from "../magicui/shimmer-button";
import { authClient } from "@/lib/auth-client";

export default function CreateChat({
  onSuccess,
}: {
  onSuccess?: () => Promise<void>;
}) {
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
      
      // Debug: Check current session
      const { data: session } = await authClient.getSession();
      console.log("Current session:", session);
      
      // Test authentication with backend
      try {
        const authTest = await axios.get(`${Env.BACKEND_URL}/api/test-auth`, {
          withCredentials: true,
        });
        console.log("Auth test result:", authTest.data);
      } catch (authError) {
        console.error("Auth test failed:", authError);
      }
      
      console.log("Creating chat group with payload:", payload);
      console.log("Backend URL:", Env.BACKEND_URL);
      console.log("Environment:", process.env.NODE_ENV);
      
      const { data } = await axios.post(
        `${Env.BACKEND_URL}/api/chat-group`,
        payload,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

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
      console.error("Error creating chat group:", error);
      
      if (error instanceof AxiosError) {
        console.error("Axios error details:", {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          headers: error.response?.headers,
        });
        toast.error(error.response?.data?.message || error.message);
      } else {
        toast.error("Something went wrong. Please try again!");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ShimmerButton className="shadow-2xl ">
          <PlusIcon size={20} className="text-white mr-3" />
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-md">
            Create Room
          </span>
        </ShimmerButton>
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
            <Button className="w-full bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80" disabled={loading}>
              {loading ? "Processing.." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
