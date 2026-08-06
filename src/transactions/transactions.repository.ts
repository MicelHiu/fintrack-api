import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";

@Injectable()
export class TransactionsRepository {
    constructor(private readonly prisma: PrismaService) {}
    getAllTransactions() {
        return this.prisma.transactions.findMany();
    }    

    getTransactionById(id: number) {
        return this.prisma.transactions.findUnique({where: {id}});
    }

    getCategoryId(category_id: number) {
        return this.prisma.categories.findUnique({
            where: {id: category_id},
            select: {name: true}
        })
    }

    getAccountId(account_id: number) {
        return this.prisma.accounts.findUnique({
            where: {id: account_id},
            select: {
                name: true,
                balance: true,
            },
        });
    }

    getAccountBalance(account_Id: number) {
        return this.prisma.accounts.findUnique({
            where: {id: account_Id},
            select: {
                balance: true,
            }
        });
    }

    createTransaction(dto: CreateTransactionDto, newBalance) {
        return this.prisma.transactions.create({
            data: dto,
            include: {
                accounts: {
                    select: {
                        balance: true,
                    }
                },
                categories: {
                    select: {
                        name: true,
                        type: true,
                    }
                },
            }
        }),

        this.prisma.accounts.update({
            where: {
                id: dto.account_id,
            },
            data: {
                balance: newBalance,
            }
        });
    }
}