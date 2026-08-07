import { Injectable, BadRequestException } from "@nestjs/common";
import { Decimal } from "@prisma/client/runtime/index-browser";
import { transaction_type } from "generated/prisma/enums";

@Injectable()
export class BalanceCalculatorService {
    //menghitung balance baru
    apply(currentBalance: Decimal, type: transaction_type, amount: Decimal): Decimal {
        switch (type) {
            case "expense":
            case "transfer":
                return currentBalance.minus(amount);
            case "income":
                return currentBalance.plus(amount);
            default:
                throw new BadRequestException('Invalid transaction type');
        }
    }

    //revert the balance
    revert(currentBalance: Decimal, type: transaction_type, amount: Decimal): Decimal {
        switch (type) {
            case "expense":
            case "transfer":
                return currentBalance.plus(amount);
            case "income":
                return currentBalance.minus(amount);
            default:
                throw new BadRequestException('Invalid transaction type');
        }
    }

    //mapping transaction type with category type
    expectedCategoryType(type: transaction_type): string {
        return type === "transfer" ? "expense" : type;
    }
}