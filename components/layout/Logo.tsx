export default function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <svg
        className="h-8 w-8 text-primary"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5zm0 7.5L4.5 7 12 3.5 19.5 7 12 9.5zM4 9v9l8 4 8-4V9l-8 4-8-4z" />
      </svg>
      <span className="font-bold text-xl text-primary">QuizDorm</span>
    </div>
  );
}
