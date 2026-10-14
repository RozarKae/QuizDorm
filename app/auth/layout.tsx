"use client";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Form Section */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 xl:px-24 bg-white dark:bg-gray-950 z-10">
        <div className="mx-auto w-full max-w-md">
          {children}
        </div>
      </div>

      {/* Illustration / Brand Section */}
      <div className="hidden lg:flex lg:flex-1 relative bg-primary overflow-hidden items-center justify-center p-12">
        {/* Animated gradients in the background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary via-indigo-900 to-violet-800" />
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full filter blur-3xl" style={{ animationDelay: "2s" }} />
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="relative max-w-lg text-white z-20 text-center flex flex-col items-center">
          <div className="mb-8 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl">
            <svg
              className="h-16 w-16 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zm0 7.5L4.5 7 12 3.5 19.5 7 12 9.5zM4 9v9l8 4 8-4V9l-8 4-8-4z" />
            </svg>
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight mb-4">
            Master Your Studies with QuizDorm
          </h2>
          <p className="text-lg text-white/80 max-w-md">
            Create interactive quizzes, study collaboratively with peers, and track your learning progress using our premium platform.
          </p>

          <div className="mt-12 p-6 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 text-left max-w-sm">
            <p className="text-sm italic text-white/90">
              &ldquo;QuizDorm transformed our school&apos;s approach to formative assessment. Students are highly engaged and teachers save hours each week.&rdquo;
            </p>
            <div className="mt-4 flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-white/25 flex items-center justify-center font-bold text-xs">
                JD
              </div>
              <div>
                <p className="text-xs font-semibold">Jane Doe</p>
                <p className="text-[10px] text-white/60">School Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
