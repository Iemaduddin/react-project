import { Request, Response } from "express";
import prisma from "../prisma";
import { Category } from "@prisma/client";

export const categories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });
    res.status(200).json({
      message: "Berhasil mendapatkan data kategori",
      data: categories,
    });
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({
      error: "Gagal mendapatkan data kategori",
    });
  }
};

export const createCategory = async (req: Request, res: Response): Promise<void> => {
  const { name, slug }: Category = req.body;

  try {
    const existingCategory = await prisma.category.findUnique({
      where: { slug },
    });

    if (existingCategory) {
      res.status(400).json({ message: "Kategori dengan slug ini sudah ada." });
      return;
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug,
      },
    });

    res.status(201).json({
      message: "Kategori berhasil dibuat",
      category,
    });
  } catch (err) {
    console.error("Error creating category:", err);
    res.status(500).json({
      error: "Gagal membuat kategori",
    });
  }
};

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, slug }: Category = req.body;

  try {
    const category = await prisma.category.update({
      where: { id: Number(id) },
      data: {
        name,
        slug,
      },
    });

    res.status(200).json({
      message: "Kategori berhasil diperbarui",
      category,
    });
  } catch (err) {
    console.error("Error updating category:", err);
    res.status(500).json({
      error: "Gagal memperbarui kategori",
    });
  }
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await prisma.category.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({
      message: "Kategori berhasil dihapus",
    });
  } catch (err) {
    console.error("Error deleting category:", err);
    res.status(500).json({
      error: "Gagal menghapus kategori",
    });
  }
};
