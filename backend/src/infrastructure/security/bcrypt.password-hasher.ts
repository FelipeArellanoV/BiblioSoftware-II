import { Injectable } from '@nestjs/common';
import { PasswordHasher } from '../../domain/services/password-hasher';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptPasswordHasher implements PasswordHasher {
  hash(plain: string) { return bcrypt.hash(plain, 10); }
  compare(plain: string, hash: string) { return bcrypt.compare(plain, hash); }
}
