import type { Knex } from "knex";
import { env } from "../config/env";



const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql2",
    connection: {
      host: env.DB_HOST,
      port: Number(env.DB_PORT),
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
    },
    migrations: {
      directory: "./migrations",
    },
  },
};

export default config;
