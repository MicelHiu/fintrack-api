import { IsString, MaxLength, IsEnum, IsNumber, Min, IsOptional } from "class-validator";
import { accounts_type } from "generated/prisma/client";

export class UpdateAccountDto {
    @IsNumber()
    user_id!: number;
    
    @IsString()
    @MaxLength(255)
    @IsOptional()
    name?: string;
    
    @IsEnum(accounts_type)
    @IsOptional()
    type?: accounts_type;
    
    @IsNumber()
    @Min(0)
    @IsOptional()
    balance?: number;
}