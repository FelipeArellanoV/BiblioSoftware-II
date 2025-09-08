import { UsersRepository } from '../../domain/repositories/users.repository';
import { PasswordHasher } from '../../domain/services/password-hasher';
import { TokenService } from '../../domain/services/token-service';

export class LoginUserUseCase {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly hasher: PasswordHasher,
    private readonly tokens: TokenService,
  ) {}

  async execute(input: { email: string; password: string }) {
    const user = await this.usersRepo.findByEmail(input.email);
    if (!user) throw new Error('Credenciales inválidas');
    const ok = await this.hasher.compare(input.password, user.passwordHash);
    if (!ok) throw new Error('Credenciales inválidas');
    const access_token = await this.tokens.sign({ sub: user.id, email: user.email, role: user.role });
    return { access_token, user: { id: user.id, email: user.email, name: user.name, role: user.role } };
  }
}
