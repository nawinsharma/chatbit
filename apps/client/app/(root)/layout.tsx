interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {children}
    </div>
  );
}
