"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../prisma"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "your-secret";
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, roleId } = req.body;
    try {
        const exist = yield prisma_1.default.user.findUnique({ where: { email } });
        if (exist)
            return res.status(400).json({
                message: "Email sudah terdaftar",
            });
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield prisma_1.default.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                roleId,
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
    }
    catch (err) {
        res.status(500).json({
            error: "Register akun gagal!",
            details: err,
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield prisma_1.default.user.findUnique({ where: { email }, include: { role: true } });
        if (!user)
            return res.status(404).json({
                message: "Email tidak ditemukan!",
            });
        const match = yield bcrypt_1.default.compare(password, user.password);
        if (!match)
            return res.status(401).json({
                message: "Password Salah!",
            });
        const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role.name }, JWT_SECRET, { expiresIn: "1d" });
        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role.name,
            },
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Terjadi kesalahan saat login!",
            details: err,
        });
    }
});
exports.login = login;
