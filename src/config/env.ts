import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

export const env = {
  PORT: process.env.PORT || 3000,
  DB_HOST: process.env.DB_HOST!,
  DB_PORT: process.env.DB_PORT!,
  DB_USER: process.env.DB_USER!,
  DB_PASSWORD: process.env.DB_PASSWORD!,
  DB_NAME: process.env.DB_NAME!,
  ADJUTOR_API_KEY: process.env.ADJUTOR_API_KEY!,
  APP_ID: process.env.APP_ID!,
  ADJUTOR_BASE_URL: process.env.ADJUTOR_BASE_URL!
};