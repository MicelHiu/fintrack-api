import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    getAllUsers() {
        return this.usersRepository.getAllUsers();
    }

    async getUserById(id: number, sub?: number) {
        const user = await this.usersRepository.getUserById(id);
        if(!user) return new NotFoundException(`User with id ${id} not found`);
        return user;
    }

    createUser(data: CreateUserDto) {
        return this.usersRepository.createUser(data);
    }
}
