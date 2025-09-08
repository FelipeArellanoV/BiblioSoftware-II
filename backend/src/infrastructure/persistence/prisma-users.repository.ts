import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../../domain/repositories/users.repository";
import { PrismaService } from "../../prisma/prisma.service";
import { User } from "../../domain/entities/user";

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    const u = await this.prisma.user.findUnique({ where: { email } });
    return u ? new User(u.id, u.email, u.name, u.passwordHash, u.role as any) : null;
  }

  async create(data: { email: string; name: string; passwordHash: string; role?: any }) {
    const u = await this.prisma.user.create({
      data: { ...data, role: data.role ?? "USER" },
    });
    return new User(u.id, u.email, u.name, u.passwordHash, u.role as any);
  }
}
