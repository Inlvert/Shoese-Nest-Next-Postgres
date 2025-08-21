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

  async getAll(userId: number) {
    const categories = await this.categoryModel.findAll({
      where: { userId },
      include: { all: true },
    });

    return categories;
  }

  async getOne(categoryId: number) {
    const category = await this.categoryModel.findByPk(categoryId);

    return category;
  }

  async getOneAndUpdate(
    categoryId: number,
    createCategoryDto: CreateCategoryDto,
  ) {
    try {
      const category = await this.categoryModel.findByPk(categoryId);

      if (!category) {
        throw new BadRequestException(
          `Category with id: ${categoryId} not found`,
        );
      }

      category.title = createCategoryDto.title;

      await category?.save();
      return category;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getOneAndDelete(categoryId: number) {
    try {
      const category = await this.categoryModel.findByPk(categoryId);

      if (!category) {
        throw new BadRequestException(
          `Category with id: ${categoryId} not found`,
        );
      }

      await category.destroy();

      return category;
    } catch (error) {
      throw new BadRequestException(error.message || 'some error happened');
    }
  }
}
