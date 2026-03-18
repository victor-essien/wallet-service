import { Request, Response } from "express";
import { WalletService } from "./wallet.service";
import { successResponse } from "../../utils/response";

const walletService = new WalletService();

export class WalletController {
  async fund(req: Request, res: Response) {
    const { userId, amount } = req.body;
    const result = await walletService.fundWallet(userId, amount);
    return successResponse(res, result);
  }

  async transfer(req: Request, res: Response) {
    const { senderId, receiverId, amount } = req.body;
    const result = await walletService.transfer(senderId, receiverId, amount);
    return successResponse(res, result);
  }

  async withdraw(req: Request, res: Response) {
    const { userId, amount } = req.body;
    const result = await walletService.withdraw(userId, amount);
    return successResponse(res, result);
  }
}
