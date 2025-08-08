import Env from "@/lib/env";

export async function fetchChatGroups() {
  const res = await fetch(`/api/chat-group`, {
    credentials: 'include',
    next: {
      revalidate: 60 * 60,
      tags: ["dashboard"],
    },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const response = await res.json();
  if (response?.data) {
    return response?.data;
  }
  return [];
}

export async function fetchChatGroup(id: string) {
  const res = await fetch(`/api/chat-group/${id}`, {
    credentials: 'include',
    next: {
      revalidate: 60 * 60,
      tags: ["dashboard"],
    },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const response = await res.json();
  if (response?.data) {
    return response?.data;
  }
  return null;
}

export async function fetchChatGroupUsers(id: string) {
  const res = await fetch(`/api/chat-group-user?group_id=${id}`, {
    credentials: 'include',
    next: {
      revalidate: 60 * 60,
      tags: ["chats"],
    },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const response = await res.json();
  if (response?.data) {
    return response?.data;
  }
  return [];
}
