import { User, UserRole } from "../entities/user";

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>;
  create(data: { email: string; name: string; passwordHash: string; role?: UserRole }): Promise<User>;
}
