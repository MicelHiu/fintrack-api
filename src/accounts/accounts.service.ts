import { Injectable } from '@nestjs/common';
import { AccountsRepository } from './accounts.repository';
import { CreateAccountDto } from './dto/create-account.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountsService {
    constructor(private readonly accountsRepository: AccountsRepository) {}
    getAllAccounts() {
        return this.accountsRepository.getAllAccounts();
    }

    async getAccountById(id: number) {
        const account = await this.accountsRepository.getAccountById(id);
        if(!account) {
            throw new NotFoundException(`Account with ID ${id} not found`);
        }
        return account;
    }

    async createAccount(dto: CreateAccountDto) {
        const user_id = await this.accountsRepository.getAccountById(dto.user_id);
        if(!user_id) {
            throw new NotFoundException(`User with ID ${dto.user_id} not found`);
        }
        return this.accountsRepository.createAccount({
            user_id: dto.user_id,
            name: dto.name,
            type: dto.type,
            balance: dto.balance,
        });
    }

    async updateAccount(dto: UpdateAccountDto, id: number) {
        const accountId = await this.accountsRepository.getUserId(dto.user_id);
        if(!accountId) throw new NotFoundException(`Account with ID ${id} not found`);

        const updated = await this.accountsRepository.updateAccount(dto, id);
        if(!updated) throw new NotFoundException(`update failed`);
        return updated;
    }

    async deleteAccount(id: number) {
        const deleted = await this.accountsRepository.getAccountById(id);
        if(!deleted) throw new NotFoundException(`This account not found`);
        return this.accountsRepository.deleteAccount(id);
    }
}
