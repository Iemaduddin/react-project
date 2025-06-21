const Label = ({ htmlFor, children }) => {
  return (
    <label htmlFor={htmlFor} className="mb-1 font-semibold text-slate-700">
      {children}
    </label>
  );
};

export default Label;
