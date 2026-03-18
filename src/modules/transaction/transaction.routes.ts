import { Router } from "express";
import { TransactionController } from "./transaction.controller";
import { validate } from "../../middleware/validator";
import { body } from "express-validator";

const router = Router();
const controller = new TransactionController();

router.get(
  "/transactions/:userId",
  validate([body("userId").notEmpty()]),
  controller.getHistory,
);
router.get(
  "/transactions/:userId/summary",
  validate([body("userId").notEmpty()]),
  controller.getSummary,
);

export default router;
