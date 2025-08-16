import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const existUser = await this.userModel.findOne({
      where: { email: createUserDto.email },
    });
    if (existUser) {
      throw new Error('user alredy exist');
    }

    const hashedPassword = await argon2.hash(createUserDto.password);

    const newUser = await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return newUser;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(email: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ where: { email } });

    return user ?? undefined;
  }
}
