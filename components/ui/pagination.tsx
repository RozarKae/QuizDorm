import { cn } from "@/lib/utils";
import { ChevronLeft,ChevronRight,MoreHorizontal } from "lucide-react";
import { Button } from "./button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      role="navigation"
      aria-label="Pagination Navigation"
      className={cn("flex items-center justify-center space-x-1.5 py-4 font-mono text-xs", className)}
    >
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="h-8 px-3 rounded-[4px] border-[rgba(240, 160, 180,0.18)] bg-[#1D1013] text-[#A0AEA5] hover:text-[#F2F7F3] hover:border-[#FF4D6D]/30 disabled:opacity-30"
      >
        <ChevronLeft className="w-3.5 h-3.5 mr-1" />
        <span className="hidden sm:inline">Previous</span>
      </Button>

      {pages.map((page) => {
        if (
          page === 1 ||
          page === totalPages ||
          (page >= currentPage - 1 && page <= currentPage + 1)
        ) {
          return (
            <Button
              key={page}
              size="sm"
              onClick={() => onPageChange(page)}
              className={cn(
                "h-8 w-8 p-0 rounded-[4px] text-xs font-mono font-bold transition-all",
                currentPage === page
                  ? "bg-[#FF4D6D] hover:bg-[#FF4D6D]/90 text-[#0B0708] shadow-[0_0_10px_rgba(255, 77, 109,0.2)]"
                  : "border border-[rgba(240, 160, 180,0.18)] bg-[#1D1013] text-[#A0AEA5] hover:text-[#F2F7F3] hover:border-[#FF4D6D]/30"
              )}
            >
              {page}
            </Button>
          );
        }

        if (
          (page === 2 && currentPage > 3) ||
          (page === totalPages - 1 && currentPage < totalPages - 2)
        ) {
          return (
            <span key={page} className="px-1 text-[#69786F]">
              <MoreHorizontal className="w-3.5 h-3.5" />
            </span>
          );
        }

        return null;
      })}

      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="h-8 px-3 rounded-[4px] border-[rgba(240, 160, 180,0.18)] bg-[#1D1013] text-[#A0AEA5] hover:text-[#F2F7F3] hover:border-[#FF4D6D]/30 disabled:opacity-30"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-3.5 h-3.5 ml-1" />
      </Button>
    </nav>
  );
}
