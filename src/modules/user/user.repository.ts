import { db } from "../../database/knex";
import { CreateUserInput, User } from "./user.types";
import { Knex } from "knex";

export class UserRepository {
  // Function to create user
  async create(user: CreateUserInput, trx: Knex.Transaction): Promise<void> {
    return trx<User>("users").insert(user);
  }

  // Function to find user by email
  async findByEmail(email: string): Promise<User | undefined> {
    return db<User>("users").where({ email }).first();
  }

  // Find user by ID
  async findById(id: string): Promise<User | undefined> {
    return db<User>("users").where({ id }).first();
  }
}
