import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import logger from "./utils/logger";
import { errorHandler, notFound } from "./middleware/errorHandler.middleware";
import userRoutes from "./modules/user/user.routes";
import walletRoutes from "./modules/wallet/wallet.routes";
import transactionRoutes from "./modules/transaction/transaction.routes";

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use(
  morgan("combined", {
    stream: { write: (message) => logger.info(message.trim()) },
  }),
);

app.get("/", (req: Request, res: Response) => {
  res.send("Wallet Service API is running");
});
// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});
// Define the user routes
app.use("/api", userRoutes);

// Define the wallet routes
app.use("/api", walletRoutes);

// Define the transaction routes
app.use("/api", transactionRoutes);

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

export default app;
