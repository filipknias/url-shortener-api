import { ReactNode } from "react"

interface IProps {
  children: ReactNode;
}

export const Label = ({ children }: IProps) => {
  return (
    <span className="text-md uppercase font-bold mb-3 block">{children}</span>
  )
}