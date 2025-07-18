"use client";
import React from "react";
// import UserAvatar from "../common/UserAvatar";
import { Button } from "../ui/button";
// import ProfileMenu from "../common/ProfileMenu";

export default function DashNav({
  image,
  name,
}: {
  image?: string;
  name: string;
}) {
  return (
    <nav className="py-2 px-6 flex justify-between items-center bg-white shadow-sm">
      <h1 className="text-xl md:text-2xl font-extrabold">Chat</h1>
      <div className="flex items-center space-x-2 md:space-x-6 text-gray-700">
        {/* <ProfileMenu name={name} image={image} /> */}
        {/* <UserAvatar name={name} image={image} /> */}
        <Button variant="outline">Logout</Button>
      </div>
    </nav>
  );
}
