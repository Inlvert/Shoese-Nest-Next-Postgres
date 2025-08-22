import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ResponseUserDto } from './dto/response-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    const existUser = await this.userModel.findOne({
      where: { email: createUserDto.email },
    });
    if (existUser) {
      throw new ConflictException('user alredy exist');
    }

    const hashedPassword = await argon2.hash(createUserDto.password);

    const user = await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user.id, email: user.email });

    return { user, token };
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(email: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ where: { email } });

    return user ?? undefined;
  }
}
