import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputForm from "../Elements/Input";
import Button from "../Elements/Button";

const FormLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((us) => us.email === form.email && us.password === form.password);

    if (user) {
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    } else {
      setError("Email atau password Anda Salah!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="text-white text-sm mb-2 border-2 p-2 bg-red-500 rounded-md">{error}</p>}
      <InputForm label="Email" name="email" type="email" placeholder="Masukkan Email Anda" value={form.email} onChange={handleChange} />
      <InputForm label="Password" name="password" type="password" placeholder="Masukkan Password Anda" value={form.password} onChange={handleChange} />
      <Button>Sign In</Button>
    </form>
  );
};

export default FormLogin;
