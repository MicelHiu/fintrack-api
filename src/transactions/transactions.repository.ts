import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class TransactionsRepository {
    constructor(private readonly prisma: PrismaService) {}
    getAllTransactions() {
        return this.prisma.transactions.findMany();
    }    

    getTransactionById(id: number) {
        return this.prisma.transactions.findUnique({where: {id}});
    }

    
}