
import { Request, Response, NextFunction } from "express";
import { AppError } from "./error.middleware";

// Error handler middleware
export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err); // log for debugging

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      code: err.code,
    });
  }

  // Unknown errors
  return res.status(500).json({
    success: false,
    message: "Something went wrong",
    code: "INTERNAL_SERVER_ERROR",
  });
};

export const notFound = (req: Request, res: Response): void => {
  res.status(404).json({
    error: 'Route not found',
    status: 404,
  });
};