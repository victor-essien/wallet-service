// Create user types
export interface CreateUserDTO {
  name: string;
  email: string;
}
// User type
export interface User {
  id: string;
  name: string;
  email: string;
  created_at?: Date;
  updated_at?: Date;
}

// For DB insert
export type CreateUserInput = Omit<User, "created_at" | "updated_at">;
