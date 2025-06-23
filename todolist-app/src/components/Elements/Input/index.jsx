import Input from "./Input";
import Label from "./Label";

const InputForm = ({ label, name, type, placeholder, value, onChange }) => {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={name} className="mb-1 font-semibold text-slate-700">
        {label}
      </label>
      <Input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>
  );
};

export default InputForm;
