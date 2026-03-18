import { UserService } from "../../modules/user/user.service";
import { UserRepository } from "../../modules/user/user.repository";
import { KarmaService } from "../../services/karma.service";
import { WalletRepository } from "../../modules/wallet/wallet.repository";
jest.mock("../../modules/user/user.repository");
jest.mock("../../modules/wallet/wallet.repository");
jest.mock("../../services/karma.service");

describe("UserService", () => {
    let service: UserService;

    beforeEach(() => {
        service = new UserService();
    })

    test("should create user successfully (positive)", async () => {
        (UserRepository.prototype.findByEmail as jest.Mock).mockResolvedValue(null);
        (KarmaService.prototype.isBlacklisted as jest.Mock).mockResolvedValue(false);
        (UserRepository.prototype.create as jest.Mock).mockResolvedValue(["userId"]);

(WalletRepository.prototype.create as jest.Mock).mockResolvedValue(["walletId"]);

        const result = await service.createUser({
            name: "Victor",
            email: "test@gmail.com",
        });

        expect(result).toHaveProperty("id");
    })
    
    test("should fail if user already exists (negative)", async () => {
    (UserRepository.prototype.findByEmail as jest.Mock).mockResolvedValue({ id: "1" });

    await expect(
      service.createUser({ name: "Victor", email: "test@mail.com" })
    ).rejects.toThrow("User already exists");
  });

  test("should fail if user is blacklisted (negative)", async () => {
    (UserRepository.prototype.findByEmail as jest.Mock).mockResolvedValue(null);
    (KarmaService.prototype.isBlacklisted as jest.Mock).mockResolvedValue(true);

    await expect(
      service.createUser({ name: "Victor", email: "test@mail.com" })
    ).rejects.toThrow("User is blacklisted");
  });
})