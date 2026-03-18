import { Request, Response } from "express";
import { TransactionService } from "./transaction.service";
import { successResponse } from "../../utils/response";

const transactionService = new TransactionService();

export class TransactionController {
  async getHistory(req: Request, res: Response) {
    const { userId } = req.params;

    const transactions = await transactionService.getUserTransactions(
      userId as string,
    );
    return successResponse(res, transactions);
  }

  async getSummary(req: Request, res: Response) {
    const { userId } = req.params;

    const summary = await transactionService.getUserSummary(userId as string);
    return successResponse(res, summary);
  }
}
