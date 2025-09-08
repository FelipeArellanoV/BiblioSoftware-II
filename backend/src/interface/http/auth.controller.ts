import { Body, Controller, Post } from "@nestjs/common";
import { LoginDto, RegisterDto } from "./dto";
import { LoginUserUseCase } from "../../application/use-cases/login-user.usecase";
import { RegisterUserUseCase } from "../../application/use-cases/register-user.usecase";

@Controller("auth")
export class AuthHttpController {
  constructor(
    private readonly loginUC: LoginUserUseCase,
    private readonly registerUC: RegisterUserUseCase,
  ) {}

  @Post("login")
  login(@Body() dto: LoginDto) {
    return this.loginUC.execute(dto);
  }

  @Post("register")
  register(@Body() dto: RegisterDto) {
    return this.registerUC.execute(dto);
  }
}
