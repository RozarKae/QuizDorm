export default function Footer() {
  return (
    <footer className="border-t border-[rgba(240, 160, 180,0.12)] px-6 py-2.5 text-xs font-mono text-[#69786F] flex flex-col sm:flex-row items-center justify-between bg-[#0B0708]/80 backdrop-blur-xs">
      <div className="flex items-center space-x-2">
        <span className="font-bold text-[#F2F7F3] font-display tracking-tight text-[11px]">QUIZDORM</span>
        <span className="text-[rgba(240, 160, 180,0.2)]">/</span>
        <span className="text-[10px] text-[#A0AEA5]">Universal Quiz Dormitory & IQ Acceleration</span>
      </div>
      <div className="flex items-center space-x-3 mt-1 sm:mt-0 text-[10px]">
        <span className="flex items-center gap-1.5 text-[#A0AEA5]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D6D] animate-pulse" />
          <span>Core: Active</span>
        </span>
        <span className="text-[rgba(240, 160, 180,0.2)]">|</span>
        <span>&copy; {new Date().getFullYear()} QuizDorm OS</span>
      </div>
    </footer>
  );
}
