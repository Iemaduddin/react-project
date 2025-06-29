import express from "express";
import { register, login, logout } from "../controllers/auth.controller";
import { createUser, deleteUser, updateUser, users } from "../controllers/users-management.controller";

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

export default router;
