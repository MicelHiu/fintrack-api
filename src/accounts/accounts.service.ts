import { Injectable } from '@nestjs/common';
import { AccountsRepository } from './accounts.repository';
import { CreateAccountDto } from './dto/create-account.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountsService {
    constructor(private readonly accountsRepository: AccountsRepository) {}
    async getAllAccounts() {
        return this.accountsRepository.getAllAccounts();
    }

    async getAccountById(id: number, userId?: number) {
        const account = await this.accountsRepository.getAccountById(id);
        if(!account) {
            throw new NotFoundException(`Account with ID ${id} not found`);
        }
        if (userId && account.user_id !== userId) {
            throw new NotFoundException('Account with ID ${id} not found');
        }
        return account;
    }

    async getAccountByUserId(userId: number) {
        return this.accountsRepository.getAccountByUserId(userId);
    }

    async createAccount(sub: number, dto: CreateAccountDto) {
        const user_id = await this.accountsRepository.getUserId(sub);
        if(!user_id) {
            throw new NotFoundException(`User with ID ${sub} not found`);
        }
        return this.accountsRepository.createAccount({
            user_id: sub,
            name: dto.name,
            type: dto.type,
            balance: dto.balance,
        });
    }

    async updateAccount(dto: UpdateAccountDto, id: number, userId: number) {
        const accountId = await this.accountsRepository.getAccountById(id);
        if(!accountId) throw new NotFoundException(`Account with ID ${id} not found`);

        const updated = await this.accountsRepository.updateAccount(dto, id);
        if(!updated) throw new NotFoundException(`update failed`);
        return updated;
    }

    async deleteAccount(id: number, userId: number) {
        const deleted = await this.accountsRepository.getAccountById(id);
        if(!deleted) throw new NotFoundException(`This account not found`);
        return this.accountsRepository.deleteAccount(id);
    }
}
