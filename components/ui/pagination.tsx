import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

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
      className={cn("flex items-center justify-center space-x-1 sm:space-x-2 py-4", className)}
    >
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="h-9 px-3 rounded-lg border-gray-200 dark:border-gray-800"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
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
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page)}
              className={cn(
                "h-9 w-9 p-0 rounded-lg text-sm font-medium",
                currentPage === page
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                  : "border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300"
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
            <span key={page} className="px-1 text-gray-400">
              <MoreHorizontal className="w-4 h-4" />
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
        className="h-9 px-3 rounded-lg border-gray-200 dark:border-gray-800"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </nav>
  );
}
