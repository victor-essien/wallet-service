import { db } from "../../database/knex";

export class UserRepository {
  // Function to create user
  async create(user: any, trx: any) {
    return trx("users").insert(user);
  }

  // Function to find user by email
  async findByEmail(email: string) {
    return db("users").where({ email }).first();
  }

  // Find user by ID
  async findById(id: string) {
    return db("users").where({ id }).first();
  }
}
