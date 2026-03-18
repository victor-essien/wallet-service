import { TransactionService } from "../../modules/transaction/transaction.service";
import { TransactionRepository } from "../../modules/transaction/transaction.repository";

jest.mock("../../modules/transaction/transaction.repository");

describe("TransactionService", () => {
  let service: TransactionService;

  beforeEach(() => {
    service = new TransactionService();
  });

  test("should return transactions (positive)", async () => {
    (TransactionRepository.prototype.findByUserId as jest.Mock)
      .mockResolvedValue([{ id: "1", amount: 100 }]);

    const result = await service.getUserTransactions("user1");

    expect(result.length).toBe(1);
  });

  test("should throw if no transactions (negative)", async () => {
    (TransactionRepository.prototype.findByUserId as jest.Mock)
      .mockResolvedValue([]);

    await expect(service.getUserTransactions("user1"))
      .rejects.toThrow("No transactions found");
  });

  test("should return summary (positive)", async () => {
    (TransactionRepository.prototype.getSummary as jest.Mock)
      .mockResolvedValue({
        total_funded: 100,
        total_withdrawn: 20,
        total_sent: 30,
        total_received: 50,
      });

    const result = await service.getUserSummary("user1");

    expect(result.totalFunded).toBe(100);
  });
});