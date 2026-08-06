import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { TransactionsRepository } from './transactions.repository';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
    constructor(private readonly transactionsRepository: TransactionsRepository) {}
    getAllTransactions() {
        return this.transactionsRepository.getAllTransactions();
    }

    async getTransactionById(id: number) {
        const data = await this.transactionsRepository.getTransactionById(id);
        if (!data) throw new NotFoundException(`transaction not found`);
        return data;
    }

    async createTransactions(dto: CreateTransactionDto) {
        const account = await this.transactionsRepository.getAccountId(dto.account_id);
        const category = await this.transactionsRepository.getCategoryId(dto.category_id);
        if(!account) return new NotFoundException(`Account not found`);
        if(!category) return new NotFoundException(`Category not found`);

        if(account.balance < dto.amount && dto.type == "expense" || "transfer") throw new BadRequestException('Balance tidak cukup');

        if(dto.type == "income")



    }


    
}
