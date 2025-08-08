export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 pt-16 sm:pt-24">
        {children}
      </main>
    </div>
  );
} 