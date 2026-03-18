import { Router } from "express";
import { WalletController } from "./wallet.controller";
import { rateLimiter } from "../../utils/rateLimiter";
import { validate } from "../../middleware/validator";
import { body } from "express-validator";

const router = Router();
const controller = new WalletController();

router.post(
  "/wallet/fund",
  rateLimiter,
  validate([body("userId").notEmpty(), body("amount").isInt({ min: 0 })]),
  controller.fund,
);

router.post(
  "/wallet/transfer",
  rateLimiter,
  validate([
    body("senderId").notEmpty(),
    body("receiverId").notEmpty(),
    body("amount").isInt({ min: 0 }),
  ]),

  controller.transfer,
);

router.post(
  "/wallet/withdraw",
  rateLimiter,
  validate([body("userId").notEmpty(), body("amount").isInt({ min: 0 })]),
  controller.withdraw,
);

export default router;
