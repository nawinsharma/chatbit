"use client";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  );
} 