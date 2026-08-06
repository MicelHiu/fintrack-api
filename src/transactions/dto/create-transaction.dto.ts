import { Decimal } from "@prisma/client/runtime/index-browser";
import { Type } from "class-transformer";
import { IsDate, IsDecimal, IsEnum, IsNumber, IsString } from "class-validator";
import { transaction_type } from "generated/prisma/enums";

export class CreateTransactionDto {
    @IsNumber()
    account_id!: number;

    @IsNumber()
    category_id!: number

    @IsEnum(transaction_type)
    type!: transaction_type;

    @IsDecimal()
    amount!: Decimal          

    @IsString()
    description!: string           

    @Type(() => Date) 
    @IsDate()
    transaction_date!: Date        
}