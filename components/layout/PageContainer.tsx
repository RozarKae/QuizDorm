export default function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1 p-6 md:p-12 overflow-y-auto bg-background text-foreground">
      {children}
    </main>
  );
}
