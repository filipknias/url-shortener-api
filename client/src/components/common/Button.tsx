import { ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color?: string;
}

export const Button = ({ children, color = "blue", ...buttonProps }: IProps) => {
  return (
    <button 
      className={`flex items-center justify-center gap-2 bg-${color}-600 hover:bg-${color}-700 transition-colors rounded-md px-4 py-2 text-white`}
      {...buttonProps}
    >
      {children}
    </button>
  )
}