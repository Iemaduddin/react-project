import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret";
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { name, email, password, roleId } = req.body;

  try {
    const exist = await prisma.user.findUnique({ where: { email } });

    if (exist) {
      res.status(400).json({ message: "Email sudah terdaftar" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const roleIdValue = roleId || 5;
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        roleId: roleIdValue,
      },
    });

    res.status(201).json({
      message: "Register akun berhasil",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({
      error: "Register akun gagal!",
    });
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });

    if (!user) {
      res.status(404).json({ message: "Email tidak ditemukan!" });
      return;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(401).json({ message: "Password Salah!" });
      return;
    }

    const token = jwt.sign({ userId: user.id, role: user.role.name }, JWT_SECRET, { expiresIn: "1d" });

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role.name,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      message: "Terjadi kesalahan saat login!",
    });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({
    message: "Anda telah berhasil logout",
  });
};
