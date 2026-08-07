import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { TransactionsRepository } from './transactions.repository';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Decimal } from '@prisma/client/runtime/index-browser';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { transaction_type } from 'generated/prisma/enums';
import { BalanceCalculatorService } from './balance-calculator.service';

@Injectable()
export class TransactionsService {
    constructor(
        private readonly transactionsRepository: TransactionsRepository,
        private readonly balanceCalculator: BalanceCalculatorService
    ) {}
    async getAllTransactions(userId: number) {
        return this.transactionsRepository.getAllTransactions(userId);
    }

    async getTransactionById(id: number, userId: number) {
        const data = await this.transactionsRepository.getTransactionById(id, userId);
        if (!data) throw new NotFoundException(`transaction not found`);
        return data;
    }

    async createTransactions(dto: CreateTransactionDto, userId: number) {
        const account = await this.transactionsRepository.getAccountId(dto.account_id, userId);
        const category = await this.transactionsRepository.getCategoryId(dto.category_id);
        if (!account) throw new NotFoundException(`Account not found`);
        if (!category) throw new NotFoundException(`Category not found`);

        if(category.type !== this.balanceCalculator.expectedCategoryType(dto.type)) {
            throw new BadRequestException(
                'Transactione type does not match category type'
            )
        }

        if ((dto.type === "expense" || dto.type === "transfer") && account.balance.lessThan(dto.amount)) {
            throw new BadRequestException("Your account's balance is not enough");
        }

        const newBalance = this.balanceCalculator.apply(account.balance, dto.type, dto.amount);

        return this.transactionsRepository.createTransaction({ ...dto }, newBalance);
    }

    async updateTransactions(dto: UpdateTransactionDto, id: number, userId: number) {
        const oldTransaction = await this.transactionsRepository.getTransactionById(id, userId);
        if (!oldTransaction) throw new NotFoundException('Transaction not found');

        const account = await this.transactionsRepository.getAccountId(oldTransaction.account_id, userId);
        if (!account) throw new NotFoundException('Account not found');

        // revert efek transaksi lama
        const restoredBalance = this.balanceCalculator.revert(account.balance, oldTransaction.type, oldTransaction.amount);

        const newType = dto.type ?? oldTransaction.type;
        const newAmount = dto.amount ?? oldTransaction.amount;

        const categoryId = dto.category_id ?? oldTransaction.category_id;
        const category = await this.transactionsRepository.getCategoryId(categoryId);
        if (!category) throw new NotFoundException('Category not found');

        if (category.type !== this.balanceCalculator.expectedCategoryType(newType)) {
            throw new BadRequestException('Transaction type does not match category type');
        }

        if ((newType === "expense" || newType === "transfer") && restoredBalance.lessThan(newAmount)) {
            throw new BadRequestException('Account balance is not enough');
        }

        const newBalance = this.balanceCalculator.apply(restoredBalance, newType, newAmount);

        return this.transactionsRepository.updateTransaction(dto, id, oldTransaction.account_id, newBalance);
    }

    async deleteTransaction(id: number, userId: number) {
        const transaction = await this.transactionsRepository.getTransactionById(id, userId);
        if (!transaction) throw new NotFoundException('Transaction not found');

        const account = await this.transactionsRepository.getAccountId(transaction.account_id, userId);
        if (!account) throw new NotFoundException('Account not found');

        const newBalance = this.balanceCalculator.revert(account.balance, transaction.type, transaction.amount);

        return this.transactionsRepository.deleteTransaction(id, transaction.account_id, newBalance);
    }
}
