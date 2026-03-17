
import { Request, Response, NextFunction } from "express";
import { AuthenticationError } from "./error.middleware";

// A simple authentication system - In this system userId is used as token. In production Jsonwebtokens are used and signed

export interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  // Check if authorization header is provided
  if (!authHeader) {
    throw new AuthenticationError("No authorization header provided");
  }
// Check if authHeader is in a valid format
  if (!authHeader.startsWith("Bearer ")) {
    throw new AuthenticationError("Invalid authorization format");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new AuthenticationError("Invalid token");
  }

  // In this MVP, token = userId
  req.userId = token;

  next();
};