import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  createCategory(@Body() createCategoryDto: CreateCategoryDto, @Req() req) {
    return this.categoryService.create(createCategoryDto, req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllCategories(@Req() req) {
    return this.categoryService.getAll(req.user.id);
  }

  @Get(':categoryId')
  @UseGuards(JwtAuthGuard)
  getOneCategory(@Param('categoryId') categoryId: number) {
    return this.categoryService.getOne(categoryId);
  }

  @Put(':categoryId')
  @UseGuards(JwtAuthGuard)
  getOneCategoryAndUpdate(
    @Param('categoryId') categoryId: number,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoryService.getOneAndUpdate(categoryId, createCategoryDto);
  }

  @Delete(':categoryId')
  @UseGuards(JwtAuthGuard)
  getOneCategoryAndDelete(@Param('categoryId') categoryId: number) {
    return this.categoryService.getOneAndDelete(categoryId);
  }
}
