import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import InputForm from "../Elements/Input";
import Button from "../Elements/Button";

type LoginResponse = {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: number;
  };
};
const FormLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Login Gagal");
      }

      const data: LoginResponse = await res.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("isLoggedIn", "true");

      navigate("/dashboard");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Terjadi kesalahan tak dikenal");
      }
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
