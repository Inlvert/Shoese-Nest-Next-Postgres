export class CreateUserDto{
  readonly id: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly birthday: Date;
  readonly email: string;
  readonly password: string;
  readonly avatar: string;
  readonly role: string;
}