import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";
import bcrypt from "bcrypt";
export const users = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: {
          select: {
            name: true,
          },
        },
      },
    });
    res.status(200).json({
      message: "Berhasil mendapatkan data user",
      data: users,
    });

    console.log("users:", users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({
      error: "Gagal mendapatkan data user",
    });
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  const { name, email, password, roleId } = req.body;
  try {
    const exist = await prisma.user.findUnique({ where: { id: parseInt(id) } });
    if (!exist) {
      res.status(404).json({ message: "User tidak ditemukan" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const roleIdValue = roleId || 5;
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        name,
        email,
        password: hashedPassword,
        roleId: roleIdValue,
      },
    });
    res.status(200).json({
      message: "Berhasil mengupdate data user",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Update user error:", err);
    res.status(500).json({
      error: "Gagal mengupdate data user",
    });
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  try {
    const exist = await prisma.user.findUnique({ where: { id: parseInt(id) } });
    if (!exist) {
      res.status(404).json({ message: "User tidak ditemukan" });
      return;
    }
    await prisma.user.delete({ where: { id: parseInt(id) } });
    res.status(200).json({
      message: "Berhasil menghapus data user",
    });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({
      error: "Gagal menghapus data user",
    });
  }
};
