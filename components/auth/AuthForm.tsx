import { FormHTMLAttributes } from "react";

interface AuthFormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function AuthForm({ children, onSubmit, className, ...props }: AuthFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className || ""}`} {...props}>
      {children}
    </form>
  );
}
