import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { TransactionsRepository } from './transactions.repository';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Decimal } from '@prisma/client/runtime/index-browser';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { transaction_type } from 'generated/prisma/enums';

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
        let newBalance: Decimal;
        switch(dto.type) {
            case "expense":
            case "transfer":
                if(account.balance.lessThan(dto.amount)) {
                    throw new BadRequestException("Your account's balance is not enough");
                } else {
                    newBalance = account.balance.minus(dto.amount);
                }
                break;

            case "income":
                newBalance = account.balance.plus(dto.amount);
                break;
            default:
                throw new BadRequestException('Invalid transaction type');
        }
        return this.transactionsRepository.createTransaction({
            account_id: dto.account_id,
            amount: dto.amount,
            category_id: dto.category_id,
            description: dto.description,
            transaction_date: dto.transaction_date,
            type: dto.type,
        }, newBalance);
    }

    async updateTransactions(dto: UpdateTransactionDto, id: number) {
        //get the old one
        const oldTransaction = await this.transactionsRepository.getTransactionById(id);
        if(!oldTransaction) throw new NotFoundException('Transaction not found');
        //get the acc
        const account = await this.transactionsRepository.getAccountId(oldTransaction.account_id);
        if(!account) throw new NotFoundException('Account not found');

        //restored the previous transactions. Because if user changed the amount and types, it should revert the balance for it to counts.
        let prevBalance: Decimal;
        switch(oldTransaction.type) {
            case "transfer":
            case "expense": 
                prevBalance = account.balance.plus(oldTransaction.amount);
                break;
            case "income":
                prevBalance = account.balance.minus(oldTransaction.amount);
                break;
            default: 
                throw new BadRequestException('Invalid transaction type');
        }

        //apply the update
        const newType = dto.type ?? oldTransaction.type;
        const newAmount = dto.amount ?? oldTransaction.amount;

        let newBalance: Decimal;
        switch(newType) {
            case "transfer":
            case "expense":
                if(prevBalance.lessThan(newAmount)) {
                    throw new BadRequestException('Account balance is not enough');
                };
                newBalance = prevBalance.minus(newAmount);
                break;
            case "income":
                newBalance = prevBalance.plus(newAmount);
                break;
            default:
                throw new BadRequestException('Invalid transaction type');
        }
        return this.transactionsRepository.updateTransaction(
            dto,
            id,
            oldTransaction.account_id, // ✅ pakai account_id dari data lama, bukan dari dto
            newBalance,
        );
    }

    async deleteTransaction(id: number,  ) {
        const transaction = await this.transactionsRepository.getTransactionById(id);
        if(!transaction) throw new NotFoundException('Transaction not found');

        const account = await this.transactionsRepository.getAccountId(transaction.account_id);
        if (!account) throw new NotFoundException('Account not found');

        let newBalance: Decimal;
        switch(transaction.type) {
            case "expense":
            case "transfer":
                newBalance = account.balance.plus(transaction.amount);
                break;
            case "income":
                newBalance = account.balance.minus(transaction.amount);
                break;
            default:
                throw new BadRequestException('Invalid transaction type');
        } 
        return this.transactionsRepository.deleteTransaction(id, transaction.account_id, newBalance)
    }
}
