import { Request, Response, NextFunction } from "express";
import prisma from "../prisma";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

export const posts = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const posts = await prisma.post.findMany({
      where: (() => {
        if (!req.user?.role) {
          throw new Error("Unauthorized");
        }

        if (["superadmin", "admin", "editor"].includes(req.user.role)) {
          return { status: "publish" }; // ambil semua
        }

        if (req.user.role === "author") {
          return {
            status: "publish",
            authorId: req.user.userId, // hanya post miliknya sendiri
          };
        }

        // Kalau member, unauthorized
        throw new Error("Unauthorized");
      })(),
      include: {
        category: true,
        author: true,
      },
    });
    res.status(200).json({
      message: "Berhasil mendapatkan data post",
      data: posts,
    });
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({
      error: "Gagal mendapatkan data post",
    });
  }
};

export const postsBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { slug } = req.params;
  console.log("Slug yang diterima:", slug);
  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        category: true,
        author: true,
      },
    });
    if (!post) {
      res.status(404).json({ message: "Post tidak ditemukan" });
      return;
    }
    res.status(200).json({
      message: "Berhasil mendapatkan data post",
      data: post,
    });
  } catch (err) {
    console.error("Error fetching post by slug:", err);
    res.status(500).json({
      error: "Gagal mendapatkan data post",
    });
  }
};

export const createPost = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const { title, content, slug, status, categoryId } = req.body;
  const thumbnail = req.file?.filename;
  const authorId = req.user?.userId;

  if (!title || !content || !categoryId || !req.file || !authorId) {
    res.status(400).json({
      error: "Semua field wajib diisi",
      missing: {
        title: !title,
        content: !content,
        categoryId: !categoryId,
        file: !req.file,
        authorId: !authorId,
      },
    });
    return;
  }

  try {
    const thumbnailPath = `/uploads/thumbnails/${req.file.filename}`;

    const post = await prisma.post.create({
      data: {
        title,
        content,
        thumbnail: thumbnailPath,
        slug: title.toLowerCase().replace(/\s+/g, "-"),
        status,
        category: {
          connect: { id: Number(categoryId) },
        },
        author: {
          connect: { id: authorId },
        },
      },
      include: {
        category: true,
        author: true,
      },
    });

    res.status(201).json({
      message: "Post berhasil dibuat",
      post: {
        id: post.id,
        title: post.title,
        content: post.content,
        thumbnail: post.thumbnail,
        status: post.status,
        slug: post.slug,
        category: {
          name: post.category.name,
          slug: post.category.slug,
        },
        author: {
          name: post.author.name,
        },
      },
    });
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({
      error: "Gagal membuat post",
      detail: (err as Error).message,
    });
  }
};

export const updatePost = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const postId = Number(req.params.id);
  const { title, content, slug, status, categoryId } = req.body;
  const authorId = req.user?.userId;

  if (!postId || !authorId) {
    res.status(400).json({ error: "ID post dan author tidak boleh kosong" });
    return;
  }

  try {
    const existingPost = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!existingPost) {
      res.status(404).json({ error: "Post tidak ditemukan" });
      return;
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        content,
        slug: slug || title.toLowerCase().replace(/\s+/g, "-"),
        status,
        category: {
          connect: { id: Number(categoryId) },
        },
        ...(req.file?.filename && {
          thumbnail: `/uploads/thumbnails/${req.file.filename}`,
        }),
      },
      include: {
        category: true,
        author: true,
      },
    });

    res.status(200).json({
      message: "Post berhasil diupdate",
      post: updatedPost,
    });
  } catch (err) {
    console.error("Error updating post:", err);
    res.status(500).json({ error: "Gagal mengupdate post", detail: (err as Error).message });
  }
};

export const deletePost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  try {
    await prisma.post.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({
      message: "Post berhasil dihapus",
    });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({
      error: "Gagal menghapus post",
    });
  }
};
