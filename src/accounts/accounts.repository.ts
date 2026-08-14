import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { accounts_type } from 'generated/prisma/enums';

@Injectable()
export class AccountsRepository {
    constructor(private readonly prisma: PrismaService) {}

    getAllAccounts() {
        return this.prisma.accounts.findMany();
    }

    getAccountById(id: number) {
        return this.prisma.accounts.findUnique({
            where: {id}
        });
    }

    async getAccountByUserId(userId: number) {
        return this.prisma.accounts.findMany({
            where: { user_id: userId }
        });
    }

    getUserId(userId: number) {
        return this.prisma.users.findUnique({
            where: {id: userId},
            select: {
                name: true,
            }
        });
    }

    createAccount(data: {
        user_id: number;
        name: string;
        type: accounts_type;
        balance: number;
    }) {
        return this.prisma.accounts.create({
            data,
            include: {
                users: {
                    select: {
                        id: true,
                    },
                },
            },
        });
    }

    updateAccount(dto: UpdateAccountDto, id: number) {
        return this.prisma.accounts.update({
            data: dto,
            where: { id },
            include: {
                users: true,
            },
        });
    }

    async deleteAccount(id: number) {
        const deleted = await this.prisma.accounts.delete({where: {id}});

        if(deleted) {
            return { 
                messageL: 'Account deleted',
                status: 203,
                id: id,
            };
        }
    }
}