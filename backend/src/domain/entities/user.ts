export type UserRole = 'USER'|'LIBRARIAN'|'ADMIN';
export class User {
  constructor(
    public readonly id: number,
    public readonly email: string,
    public readonly name: string,
    public readonly passwordHash: string,
    public readonly role: UserRole,
  ) {}
}
