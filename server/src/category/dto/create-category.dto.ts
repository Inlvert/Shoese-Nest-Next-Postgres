import { IsNotEmpty, IsOptional } from "class-validator";
import { User } from "src/users/model/user.model";

export class CreateCategoryDto {

  id: number;
  @IsNotEmpty()
  title: string;
  
  @IsOptional()
  user?: User
}
