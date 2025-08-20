import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './model/category.model';
import { User } from 'src/users/model/user.model';
import { CategoryController } from './category.controller';

@Module({
  imports: [SequelizeModule.forFeature([Category, User])],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
