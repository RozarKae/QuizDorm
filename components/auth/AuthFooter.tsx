import Link from "next/link";

interface AuthFooterProps {
  children?: React.ReactNode;
}

export default function AuthFooter({ children }: AuthFooterProps) {
  return (
    <div className="mt-6 flex flex-col items-center space-y-4 text-center text-xs text-zinc-400">
      {children}
      <Link
        href="/"
        className="flex items-center space-x-1 text-zinc-400 hover:text-white transition-colors font-medium"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Back to Home</span>
      </Link>
    </div>
  );
}
