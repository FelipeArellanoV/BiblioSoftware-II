import { Injectable } from '@nestjs/common';
import { TokenService } from '../../domain/services/token-service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService implements TokenService {
  constructor(private jwt: JwtService) {}
  sign(payload: { sub: number; email: string; role: string }) {
    return this.jwt.signAsync(payload);
  }
}
