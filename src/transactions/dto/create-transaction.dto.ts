import { Decimal } from "@prisma/client/runtime/index-browser";
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

    @IsDate()
    transaction_date!: Date        
}