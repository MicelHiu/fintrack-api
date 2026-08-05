import { IsString, MaxLength, IsEnum } from "class-validator";
import { categories_type } from "generated/prisma/client";

export class CreateCategoryDto {
    @IsString()
    @MaxLength(50)
    name!: string;

    @IsEnum(categories_type)
    type!: categories_type;
}