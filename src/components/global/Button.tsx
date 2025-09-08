import { ReactNode, MouseEventHandler } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger" | "info";
  size?: "sm" | "md";
  disabled?: boolean;
  onMouseEnter?: MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  onMouseEnter,
  onMouseLeave,
}: ButtonProps) => {
  const base =
    "rounded-xl font-medium transition shadow-card focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50";

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
  };

  const variants = {
    primary: "bg-brand text-white hover:bg-brand-dark focus:ring-brand-light",
    secondary: "bg-secondary text-white hover:bg-secondary-dark focus:ring-secondary-light",
    danger: "bg-error text-white hover:bg-error-dark focus:ring-error-light",
    info: "bg-highlight text-neutral-900 hover:bg-highlight-dark focus:ring-highlight-light",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`${base} ${sizes[size]} ${variants[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;
