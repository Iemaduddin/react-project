import express from "express";
import { register, login, logout } from "../controllers/auth.controller";
import { createUser, deleteUser, updateUser, users } from "../controllers/users-management.controller";
import { categories, createCategory, updateCategory, deleteCategory } from "../controllers/category-management.controller";
import { posts, createPost, updatePost, deletePost, postsBySlug } from "../controllers/post-management.controller";
import upload from "../middleware/upload";
import { verifyToken } from "../middleware/auth.middleware";
import { createComment, deleteComment, getComments } from "../controllers/comment-management.controller";
import { listLatestPosts, listLatestPostsByOwner, postByCategoryByMonth, postByStatusByMonth, totalCategories, totalPostsByCategory, totalPostsByOwner, totalUsersByRole, userGrowthGraph } from "../controllers/dashboard.controller";
const router = express.Router();
// Auth
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
// Users
router.get("/users", users);
router.post("/users/store", createUser);
router.put("/users/update/:id", updateUser);
router.delete("/users/delete/:id", deleteUser);

// Categories
router.get("/categories", categories);
router.post("/categories/store", createCategory);
router.put("/categories/update/:id", updateCategory);
router.delete("/categories/delete/:id", deleteCategory);

// Posts
router.get("/posts", verifyToken, posts);
router.post("/posts/store", verifyToken, upload.single("thumbnail"), createPost);
router.put("/posts/update/:id", verifyToken, upload.single("thumbnail"), updatePost);
router.delete("/posts/delete/:id", deletePost);
router.get("/posts/:slug", postsBySlug);

// Comments
router.get("/comments/:postId", getComments);
router.post("/comments/store", verifyToken, createComment);
// router.put("/comments/update/:id", updateComment);
router.delete("/comments/delete/:id", verifyToken, deleteComment);

// Dashboard
// Total Users per Role
router.get("/dashboard/getTotalUsersByRole", totalUsersByRole);
// Total Posts per Category (publish)
router.get("/dashboard/getTotalPostsByCategory", totalPostsByCategory);
// Total Categories
router.get("/dashboard/getTotalCategories", totalCategories);
// List Latest Posts
router.get("/dashboard/getLatestPosts", listLatestPosts);
// List Latest Posts By Owner
router.get("/dashboard/getLatestPostsByOwner", verifyToken, listLatestPostsByOwner);
// Grafik Pertumbuhan Pengguna
router.get("/dashboard/userGrowthGraph", userGrowthGraph);
// Grafik Jumlah Post per Kategori per Bulan (Select Option per Tahun)
router.get("/dashboard/postByCategoryByMonth", postByCategoryByMonth);
// Grafik Jumlah Post per Kategori per Bulan (Select Option per Tahun) by owner
router.get("/dashboard/postByStatusByMonth", verifyToken, postByStatusByMonth);
// Total Posts by Owner
router.get("/dashboard/getTotalPostsByOwner", verifyToken, totalPostsByOwner);

export default router;
