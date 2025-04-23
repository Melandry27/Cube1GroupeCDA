import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export const protect = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];

      console.log("Decoded Token:", token);

      const decoded = jwt.verify(token, JWT_SECRET) as { [key: string]: any };

      if (decoded && typeof decoded === "object" && decoded.email) {
        req.user = decoded;
      }
    }
  } catch (error: any) {
    console.error("Token verification failed:", error.message);
  } finally {
    next();
  }
};
