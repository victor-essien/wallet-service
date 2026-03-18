import { WalletService } from "../../modules/wallet/wallet.service";
import { WalletRepository } from "../../modules/wallet/wallet.repository";


jest.mock("../../modules/wallet/wallet.repository");

describe("WalletService", () => {
  let service: WalletService;

  beforeEach(() => {
    service = new WalletService();
  });

  test("should fund wallet (positive)", async () => {
    (WalletRepository.prototype.findByUserId as jest.Mock).mockResolvedValue({
      id: "w1",
      balance: 100,
    });

    const result = await service.fundWallet("user1", 50);

    expect(result.balance).toBe(150);
  });

  test("should fail for negative amount (negative)", async () => {
    await expect(service.fundWallet("user1", -10))
      .rejects.toThrow("Amount must be greater than zero");
  });

  test("should fail if insufficient funds (negative)", async () => {
    (WalletRepository.prototype.findByUserId as jest.Mock).mockResolvedValue({
      id: "w1",
      balance: 10,
    });

    await expect(service.withdraw("user1", 50))
      .rejects.toThrow("Insufficient funds");
  });

  test("should transfer successfully (positive)", async () => {
    (WalletRepository.prototype.findByUserId as jest.Mock)
      .mockResolvedValueOnce({ id: "w1", balance: 100 })
      .mockResolvedValueOnce({ id: "w2", balance: 50 });

    const result = await service.transfer("u1", "u2", 30);

    expect(result.senderBalance).toBe(70);
  });

  test("should prevent self transfer (negative)", async () => {
    await expect(service.transfer("u1", "u1", 10))
      .rejects.toThrow("Cannot transfer to self");
  });
});