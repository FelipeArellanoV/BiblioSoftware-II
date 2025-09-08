import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PrismaModule } from "../prisma/prisma.module";
import { TOKENS } from "./tokens";
import { PrismaUsersRepository } from "../infrastructure/persistence/prisma-users.repository";
import { BcryptPasswordHasher } from "../infrastructure/security/bcrypt.password-hasher";
import { JwtTokenService } from "../infrastructure/security/jwt.token-service";
import { LoginUserUseCase } from "../application/use-cases/login-user.usecase";
import { RegisterUserUseCase } from "../application/use-cases/register-user.usecase";
import { AuthHttpController } from "../interface/http/auth.controller";

@Module({
  imports: [
    PrismaModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        secret: cfg.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: cfg.get<string>("JWT_EXPIRES_IN") || "1d" },
      }),
    }),
  ],
  controllers: [AuthHttpController],
  providers: [
    { provide: TOKENS.UsersRepository, useClass: PrismaUsersRepository },
    { provide: TOKENS.PasswordHasher, useClass: BcryptPasswordHasher },
    { provide: TOKENS.TokenService,   useClass: JwtTokenService },

    {
      provide: LoginUserUseCase,
      useFactory: (repo: any, hasher: any, tokens: any) =>
        new LoginUserUseCase(repo, hasher, tokens),
      inject: [TOKENS.UsersRepository, TOKENS.PasswordHasher, TOKENS.TokenService],
    },
    {
      provide: RegisterUserUseCase,
      useFactory: (repo: any, hasher: any, tokens: any) =>
        new RegisterUserUseCase(repo, hasher, tokens),
      inject: [TOKENS.UsersRepository, TOKENS.PasswordHasher, TOKENS.TokenService],
    },
  ],
})
export class AuthModule {}
