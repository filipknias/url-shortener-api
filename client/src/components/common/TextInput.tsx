import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export const TextInput = ({ ...inputProps }: Props) => {
  return (
    <input 
      className="bg-white border border-gray-300 outline-none p-2 rounded-md w-full focus:border-blue-400"
      {...inputProps}
    />
  )
}