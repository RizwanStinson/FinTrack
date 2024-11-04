// Button.tsx
import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
}

// Change buttonVariants to a function
export const buttonVariants = ({
  variant = "primary",
}: { variant?: ButtonProps["variant"] } = {}) => {
  const variants = {
    primary: "bg-blue-600 text-white",
    secondary: "bg-gray-200 text-gray-700",
    ghost: "text-gray-500",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  };

  return cn("py-2 px-4 rounded-md font-semibold", variants[variant]);
};

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant }), className)} {...props} />
  );
}
