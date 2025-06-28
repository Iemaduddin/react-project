import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
};

const Button = ({ children }: ButtonProps) => {
  return (
    <button
      type="submit"
      className="px-4 py-2 border border-blue-200 text-blue-600 rounded-md 
        hover:border-transparent hover:bg-blue-600 hover:text-white active:bg-blue-700 transition duration-200"
    >
      {children}
    </button>
  );
};

export default Button;
