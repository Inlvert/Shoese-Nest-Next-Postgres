import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './model/category.model';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category) private categoryModel: typeof Category) {}

  async create(createCategoryDto: CreateCategoryDto, userId: number) {
    const isExist = await this.categoryModel.findOne({
      where: {
        userId,
        title: createCategoryDto.title,
      },
    });

    if (isExist) {
      throw new BadRequestException('Category already exists for this user');
    }

    return await this.categoryModel.create({
      title: createCategoryDto.title,
      userId,
    });
  }
}
