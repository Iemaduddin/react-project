import { useNavigate } from "react-router-dom";
import InputForm from "../Elements/Input";
import { useState } from "react";
import Button from "../Elements/Button";

const FormRegister = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", date: "", email: "", password: "" });
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.date) {
      setError("Semua field wajib diisi!");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((us) => us.email === form.email);

    if (userExists) {
      setError("Email telah terdaftar");
      return;
    }

    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("user", JSON.stringify(form));
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="text-white text-sm mb-2 border-2 p-2 bg-red-500 rounded-md">{error}</p>}
      <InputForm label="Nama" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Masukkan Nama Anda" />
      <InputForm label="Tanggal Lahir" name="date" type="date" value={form.date} onChange={handleChange} />
      <InputForm label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="Masukkan Email Anda" />
      <InputForm label="Password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Masukkan Password Anda" />
      <Button>Sign Up</Button>
    </form>
  );
};

export default FormRegister;
