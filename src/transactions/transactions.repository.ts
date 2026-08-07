import { BadGatewayException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import { Decimal } from "@prisma/client/runtime/index-browser";

@Injectable()
export class TransactionsRepository {
    constructor(private readonly prisma: PrismaService) {}
    getAllTransactions(userId: number) {
        return this.prisma.transactions.findMany({
            where: { accounts: {user_id: userId}}
        });
    }    

    getTransactionById(id: number, userId: number) {
        return this.prisma.transactions.findUnique({where: {id,  accounts: { user_id: userId}},    
        });
    }

    getCategoryId(category_id: number) {
        return this.prisma.categories.findUnique({
            where: {id: category_id},
            select: {name: true, type: true}
        })
    }

    getAccountId(account_id: number, userId: number) {
        return this.prisma.accounts.findFirst({
            where: {id: account_id, user_id: userId},
            select: {
                name: true,
                balance: true,
            },
        });
    }

    createTransaction(dto: CreateTransactionDto, newBalance) {
        return this.prisma.$transaction([
            this.prisma.transactions.create({
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
            }),
        ]); 
    }

    async updateTransaction(
        dto: UpdateTransactionDto,
        id: number,
        account_id: number,
        newBalance: Decimal,
    ) {
        const [, updated] = await this.prisma.$transaction([
            this.prisma.accounts.update({
                where: { id: account_id },
                data: { balance: newBalance },
            }),
            this.prisma.transactions.update({
                where: { id },
                data: dto,
                include: {
                    accounts: { select: { balance: true } },
                    categories: { select: { name: true, type: true } },
                },
            }),
        ]);

        if (!updated) {
            throw new BadGatewayException("Update failed, please try again later.");
        }

        return updated;
    }

    async deleteTransaction(id: number, account_id: number, newBalance: Decimal) {
    const [deleted] = await this.prisma.$transaction([
        this.prisma.transactions.delete({
            where: { id },
            include: {
                accounts: {
                    select: {
                        user_id: true,
                        name: true,
                        balance: true,
                    },
                },
            },
        }),
        this.prisma.accounts.update({
            where: { id: account_id }, // ✅ bukan dto.account_id lagi
            data: { balance: newBalance },
        }),
    ]);

    return {
        message: 'Transaction deleted',
        status: 203,
        id,
    };
}
}