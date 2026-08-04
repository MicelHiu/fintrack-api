import { IsString, MaxLength, IsEnum, IsNumber, Min } from "class-validator";
import { accounts_type } from "generated/prisma/client";

export class UpdateAccountDto {
    @IsNumber()
    user_id!: number;
    
    @IsString()
    @MaxLength(255)
    name?: string;
    
    @IsEnum(accounts_type)
    type?: accounts_type;
    
    @IsNumber()
    @Min(0)
    balance?: number;
}