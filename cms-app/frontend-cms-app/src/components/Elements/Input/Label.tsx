import type { ReactNode } from "react";

type LabelProps = {
  htmlFor: string;
  children: ReactNode;
  className?: string;
};

const Label = ({ htmlFor, children, className = "" }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className={className}>
      {children}
    </label>
  );
};

export default Label;
