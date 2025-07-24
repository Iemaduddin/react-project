import { Request, NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import prisma from "../prisma";

export const getComments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { postId } = req.params;
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: Number(postId),
        parentId: null,
      },
      include: {
        user: true,
        replies: {
          include: {
            user: true,
            replies: {
              include: {
                user: true,
                replies: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json({
      message: "Berhasil mendapatkan data komentar",
      data: comments,
    });
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({
      error: "Gagal mendapatkan data komentar",
    });
  }
};

export const createComment = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const { content, postId, parentId } = req.body;

  const authorId = req.user?.userId;

  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        userId: Number(authorId),
        postId: Number(postId),
        parentId: parentId ? Number(parentId) : null,
      },
    });
    res.status(201).json({ message: "Komentar berhasil dikirim", data: comment });
  } catch (err) {
    console.error("Error creating comment:", err);
    res.status(500).json({ error: "Gagal mengirim komentar" });
  }
};

export const deleteComment = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  const role = req.user?.role;
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: Number(id) },
    });
    if (!comment) {
      res.status(404).json({ message: "Komentar tidak ditemukan" });
      return;
    }
    const isAdmin = role === "superadmin" || role === "admin";
    const isOwner = comment.userId === req.user?.userId;
    if (!isAdmin && !isOwner) {
      res.status(403).json({ message: "Anda tidak memiliki izin untuk menghapus komentar ini" });
      return;
    }
    await prisma.comment.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: "Komentar berhasil dihapus" });
  } catch (err) {
    console.error("Error deleting comment:", err);
    res.status(500).json({
      error: "Gagal menghapus komentar",
    });
  }
};
