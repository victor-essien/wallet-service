import { v4 as uuid } from "uuid";
import { db } from "../../database/knex";
import { UserRepository } from "./user.repository";
import { WalletRepository } from "../wallet/wallet.repository";
import { KarmaService } from "../../services/karma.service";
import {
  BlacklistedUserError,
  UserNotFoundError,
  UserAlreadyExistsError
} from "../../middleware/error.middleware";
import { email } from "zod";
export class UserService {
  private userRepo = new UserRepository();
  private walletRepo = new WalletRepository();
  private karmaService = new KarmaService();

  async createUser(data: { name: string; email: string }) {
    // Check if there's a duplicate
    const existing = await this.userRepo.findByEmail(data.email);
    if (existing) {
      throw new UserAlreadyExistsError();
    }
    // Check if blacklisted
    const isBlacklisted = await this.karmaService.isBlacklisted(data.email);
    if(isBlacklisted) {
        throw new BlacklistedUserError()
    }

    // Transaction
    return db.transaction(async (trx) => {
        // Create userId using uuid
        const userId = uuid();

        // Create user
        await this.userRepo.create(
            {
                id: userId,
                name: data.name,
                email: data.email
            },
            trx
        );
        // Create wallet for user
        await this.walletRepo.create(
            {
                id: uuid(),
                user_id: userId,
                balance: 0,
            },
            trx
        );
        return {
            id: userId,
            ...data,
        }
    })
  }

  async getUser(id: string) {
    const user = await this.userRepo.findById(id);
    if(!user) {
        throw new UserNotFoundError();
    }
    return user;
  }
}
