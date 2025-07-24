import { categories } from "./category-management.controller";
import { NextFunction, Request } from "express";
import prisma from "../prisma";
import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

// Total Users per Role
export const totalUsersByRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const totalUsersByRole = await prisma.role.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: { users: true },
        },
      },
      orderBy: {
        users: {
          _count: "desc",
        },
      },
    });

    res.status(200).json({
      message: "Berhasil mendapatkan total pengguna per role",
      data: totalUsersByRole,
    });
  } catch (err) {
    console.error("Error fetching total users by role:", err);
    res.status(500).json({
      error: "Gagal mendapatkan total pengguna per role",
    });
  }
};

export const totalPostsByCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        posts: {
          where: {
            status: "publish",
          },
          select: {
            id: true,
          },
        },
      },
    });

    const formatted = result.map((category) => ({
      id: category.id,
      name: category.name,
      totalPosts: category.posts.length,
    }));

    res.status(200).json({
      message: "Berhasil mendapatkan total post per kategori",
      data: formatted,
    });
  } catch (err) {
    console.error("Error fetching total posts by category:", err);
    res.status(500).json({
      error: "Gagal mendapatkan total post per kategori",
    });
  }
};

// Total Categories
export const totalCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const totalCategories = await prisma.category.count();
    res.status(200).json({
      message: "Berhasil mendapatkan total kategori",
      data: totalCategories,
    });
  } catch (err) {
    console.error("Error fetching total categories:", err);
    res.status(500).json({
      error: "Gagal mendapatkan total kategori",
    });
  }
};

// List Latest Posts
export const listLatestPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const latestPosts = await prisma.post.findMany({
      where: {
        status: "publish",
      },
      take: 10,
      include: {
        category: true,
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json({
      message: "Berhasil mendapatkan postingan terbaru",
      data: latestPosts,
    });
  } catch (err) {
    console.error("Error fetching latest posts:", err);
    res.status(500).json({
      error: "Gagal mendapatkan postingan terbaru",
    });
  }
};
// List Latest Posts By Woner
export const listLatestPostsByOwner = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const authorId = req.user?.userId;
  try {
    const latestPosts = await prisma.post.findMany({
      where: {
        status: "publish",
        authorId: authorId,
      },
      take: 10,
      include: {
        category: true,
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json({
      message: "Berhasil mendapatkan postingan terbaru",
      data: latestPosts,
    });
  } catch (err) {
    console.error("Error fetching latest posts:", err);
    res.status(500).json({
      error: "Gagal mendapatkan postingan terbaru",
    });
  }
};

// Grafik Pertumbuhan Pengguna
export const userGrowthGraph = async (req: Request, res: Response): Promise<void> => {
  try {
    const userGrowthData = await prisma.$queryRawUnsafe<{ month: string; total_users: bigint }[]>(`
    SELECT 
      TO_CHAR(DATE_TRUNC('month', "createdAt"), 'YYYY-MM') AS month,
      COUNT(id) AS total_users
    FROM "User"
    GROUP BY month
    ORDER BY month ASC
  `);

    const formatted = userGrowthData.map((d) => ({
      month: d.month,
      total_users: Number(d.total_users),
    }));

    res.status(200).json({
      message: "Berhasil mendapatkan grafik pertumbuhan pengguna",
      data: formatted,
    });
  } catch (err) {
    console.error("Error fetching user growth graph:", err);
    res.status(500).json({
      error: "Gagal mendapatkan grafik pertumbuhan pengguna",
    });
  }
};

export const postByCategoryByMonth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { year } = req.query;

  try {
    const yearParam = Array.isArray(year) ? year[0] : year;
    const yearNumber = parseInt(yearParam as string, 10);

    if (isNaN(yearNumber)) {
      throw new Error("Invalid year parameter");
    }

    const rawData = await prisma.$queryRaw`
      SELECT 
        c.name AS category,
        EXTRACT(MONTH FROM p."createdAt") AS month,
        COUNT(p.id) AS total
      FROM "Post" p
      JOIN "Category" c ON c.id = p."categoryId"
      WHERE p.status = 'publish' AND EXTRACT(YEAR FROM p."createdAt") = ${yearNumber}
      GROUP BY c.name, month
      ORDER BY month ASC;
    `;
    const resultData = (rawData as { category: string; month: number; total: bigint }[]).map((item) => ({
      category: item.category,
      month: item.month,
      total: Number(item.total), // Convert bigint to number
    }));

    res.status(200).json({
      message: "Berhasil mendapatkan grafik jumlah post per kategori per bulan",
      data: resultData,
    });
  } catch (err) {
    console.error("Error fetching post by category by month:", err);
    res.status(500).json({
      error: "Gagal mendapatkan grafik jumlah post per kategori per bulan",
    });
  }
};

// Total Posts by Owner
export const totalPostsByOwner = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authorId = req.user?.userId;
    const totalPostsByOwner = await prisma.post.count({
      where: {
        authorId: authorId,
        status: "publish",
      },
    });
    res.status(200).json({
      message: "Berhasil mendapatkan total post per author",
      data: totalPostsByOwner,
    });
  } catch (err) {
    console.error("Error fetching total posts by owner:", err);
    res.status(500).json({
      error: "Gagal mendapatkan total post per author",
    });
  }
};

// Grafik Total post per status by Owner
export const postByStatusByMonth = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const { year } = req.query;
  const authorId = req.user?.userId;

  try {
    const yearParam = Array.isArray(year) ? year[0] : year;
    const yearNumber = parseInt(yearParam as string, 10);

    if (isNaN(yearNumber)) {
      throw new Error("Invalid year parameter");
    }

    const rawData = await prisma.$queryRaw`
      SELECT 
        p.status,
        EXTRACT(MONTH FROM p."createdAt") AS month,
        COUNT(p.id) AS total
      FROM "Post" p
      WHERE p."authorId" = ${authorId}
        AND EXTRACT(YEAR FROM p."createdAt") = ${yearNumber}
      GROUP BY p.status, month
      ORDER BY month ASC;
    `;

    const resultData = (rawData as { status: string; month: number; total: bigint }[]).map((item) => ({
      status: item.status,
      month: item.month,
      total: Number(item.total), // Convert bigint to number
    }));

    res.status(200).json({
      message: "Berhasil mendapatkan grafik jumlah post per status per bulan",
      data: resultData,
    });
  } catch (err) {
    console.error("Error fetching post by status by month:", err);
    res.status(500).json({
      error: "Gagal mendapatkan grafik jumlah post per status per bulan",
    });
  }
};
