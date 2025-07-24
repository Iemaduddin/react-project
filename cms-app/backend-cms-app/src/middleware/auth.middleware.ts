import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface CustomJwtPayload extends JwtPayload {
  userId: number;
  role: string;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  user?: CustomJwtPayload;
}
const JWT_SECRET = process.env.JWT_SECRET || "your-secret";

export const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Token tidak ada atau tidak valid" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;

    req.user = decoded;

    next();
  } catch (err) {
    res.status(403).json({ message: "Token tidak valid" });
    return;
  }
};
