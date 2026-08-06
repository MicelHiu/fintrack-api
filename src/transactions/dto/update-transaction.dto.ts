import { PartialType } from "@nestjs/mapped-types";
import { Decimal } from "@prisma/client/runtime/index-browser";
import { IsDate, IsDecimal, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { transaction_type } from "generated/prisma/enums";
import { CreateTransactionDto } from "./create-transaction.dto";

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
    @IsNumber()
    @IsOptional()
    account_id?: number;

    @IsNumber()
    @IsOptional()
    category_id?: number

    @IsEnum(transaction_type)
    @IsOptional()
    type?: transaction_type;

    @IsDecimal()
    @IsOptional()
    amount?: Decimal          

    @IsString()
    @IsOptional()
    description?: string           

    @IsDate()
    @IsOptional()
    transaction_date?: Date        
}