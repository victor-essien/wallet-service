import express from "express";
import type { Request, Response } from "express";
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import logger from "./utils/logger";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Logging middleware
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));


app.get("/", (req: Request, res: Response) => {
  res.send("Wallet Service API is running");
});
// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});


// Start server
app.listen(PORT, () => {
  logger.info(`🚀 Server is running on port ${PORT}`);
  logger.info(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`🔗 Health check: http://localhost:${PORT}/health`);
});