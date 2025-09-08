import { UsersRepository } from "../../domain/repositories/users.repository";
import { PasswordHasher } from "../../domain/services/password-hasher";
import { TokenService } from "../../domain/services/token-service";

export class RegisterUserUseCase {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly hasher: PasswordHasher,
    private readonly tokens: TokenService,
  ) {}

  async execute(input: { email: string; name: string; password: string }) {
    const exists = await this.usersRepo.findByEmail(input.email);
    if (exists) throw new Error("Email en uso");
    const passwordHash = await this.hasher.hash(input.password);
    const user = await this.usersRepo.create({
      email: input.email,
      name: input.name,
      passwordHash,
    });
    const access_token = await this.tokens.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });
    return { access_token, user: { id: user.id, email: user.email, name: user.name, role: user.role } };
  }
}
