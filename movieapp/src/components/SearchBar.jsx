import { useState, useEffect } from "react";

export default function SearchBar({ value, onChange }) {
  const [input, setInput] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(input);
    }, 500); // debounce delay
    return () => clearTimeout(timeout);
  }, [input]);

  return <input type="text" placeholder="Search movie..." className="w-full p-2 border rounded" value={input} onChange={(e) => setInput(e.target.value)} />;
}
