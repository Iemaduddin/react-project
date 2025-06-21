const Input = (props) => {
  const { name, type, placeholder, value, onChange } = props;

  return <input id={name} name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} className="text-sm border rounded w-full py-2 px-3 text-slate-500 placeholder:opacity-40" required />;
};

export default Input;
