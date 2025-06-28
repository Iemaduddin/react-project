import { useNavigate } from "react-router-dom";
import InputForm from "../Elements/Input";
import { useState, type ChangeEvent, type FormEvent } from "react";
import Button from "../Elements/Button";

type RegisterForm = {
  name: string;
  email: string;
  password: string;
};
const FormRegister = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Register Gagal");
      }
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Gagal mendaftar");
        return;
      }
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      console.error("Register error:", err);
      setError("Terjadi kesalahan saat registrasi");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="text-white text-sm mb-2 border-2 p-2 bg-red-500 rounded-md">{error}</p>}
      <InputForm label="Nama" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Masukkan Nama Anda" />
      <InputForm label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="Masukkan Email Anda" />
      <InputForm label="Password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Masukkan Password Anda" />
      <Button>Sign Up</Button>
    </form>
  );
};

export default FormRegister;
