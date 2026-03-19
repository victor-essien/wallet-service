import axios, {AxiosInstance} from "axios";
import { env } from "../config/env";
import { AppError } from "../middleware/error.middleware";
import { KarmaResponse } from "../types/karma.type";


export class KarmaService {
    private client: AxiosInstance;

    constructor() {
    this.client = axios.create({
      baseURL: env.ADJUTOR_BASE_URL,
      headers: {
        Authorization: `Bearer ${env.ADJUTOR_API_KEY}`,
        "Content-Type": "application/json",
      },
      timeout: 5000,
    });
}

//  Check if user is blacklisted
async isBlacklisted(identity: string): Promise<boolean> {
    try {
      const response = await this.client.get<KarmaResponse>(
        `/verification/karma/${identity}`
      );

      // If data exists → user has karma record → blacklist
      if (response.data?.data) {
        return true;
      }

      return false;
    } catch (error: any) {
      // Handle known API errors safely
      if (error.response) {
        const status = error.response.status;

        // 404 = no karma record → NOT blacklisted
        if (status === 404) {
          return false;
        }

        throw new AppError(
          `Karma API error: ${error.response.data?.message || "Unknown error"}`,
          status
        );
      }

      // Network / timeout errors
      throw new AppError("Karma service unavailable", 503);
    }
  }
}