export interface TokenService {
  sign(payload: { sub: number; email: string; role: string }): Promise<string>;
}
