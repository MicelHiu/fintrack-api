import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersRepository {
    constructor(private readonly prisma: PrismaService) {}

    getAllUsers() {
        return this.prisma.users.findMany();
    }

    getUserById(id: number) {
        return this.prisma.users.findUnique({where: {id}});
    }

    createUser(data: CreateUserDto) {
        return this.prisma.users.create({data});
    }
}