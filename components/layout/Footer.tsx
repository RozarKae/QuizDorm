export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-3 text-xs font-mono text-muted-foreground flex flex-col sm:flex-row items-center justify-between bg-card/60">
      <div className="flex items-center space-x-2">
        <span className="font-bold text-foreground font-display tracking-tight">QUIZDORM</span>
        <span className="text-border">/</span>
        <span className="text-[11px]">Assessment & Knowledge Engine</span>
      </div>
      <div className="mt-1 sm:mt-0 text-[11px]">
        &copy; {new Date().getFullYear()} QuizDorm Platform. Verified Production.
      </div>
    </footer>
  );
}
