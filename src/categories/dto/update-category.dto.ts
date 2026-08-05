import { IsString, MaxLength, IsEnum, IsOptional } from "class-validator";
import { categories_type } from "generated/prisma/client";

export class UpdateCategoryDto {
    @IsString()
    @MaxLength(50)
    @IsOptional()
    name?: string;

    @IsEnum(categories_type)
    @IsOptional()
    type?: categories_type;
}