import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersRepository {
    constructor(private readonly prisma: PrismaService) {}

    getAllUsers() {
        return this.prisma.users.findMany({
            omit: { password: true },
        });
    }

    getUserById(id: number) {
        return this.prisma.users.findUnique({
            where: {id},
            include: {
                accounts: {
                    select: {
                        name: true,
                        type: true,
                        balance: true,
                    },
                },
            },
            omit: {password: true},
        });
    }

    getEmail(email: string) {
        return this.prisma.users.findUnique({
            where: {email},
            select: {
                id: true,
                role: true,
            }
        });
    }

    createUser(dto: CreateUserDto, hashedPassword: string) {
        return this.prisma.users.create({
            data: {
                name: dto.name,
                email: dto.email,
                password: hashedPassword,
                role: 'user',
            },
            omit: {password: true},
        });
    }

    async deleteUser(id: number) {
        const deleted = await this.prisma.users.delete({where: {id}});
        if(deleted) {
            return { 
                message: 'User deleted',
                status: 203,
                id: id
            }
        };
    }
}