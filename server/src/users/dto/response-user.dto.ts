import { User } from "../model/user.model";

export class ResponseUserDto {
  user: User;
  token: string;
}