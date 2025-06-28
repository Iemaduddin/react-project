import type { ChangeEvent } from "react";
import Input from "./Input";
import Label from "./Label";

type InputFormProps = {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const InputForm = ({ label, name, type, placeholder, value, onChange }: InputFormProps) => {
  return (
    <div className="flex flex-col mb-4">
      <Label htmlFor={name} className="mb-1 font-semibold text-slate-700">
        {label}
      </Label>
      <Input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>
  );
};

export default InputForm;
