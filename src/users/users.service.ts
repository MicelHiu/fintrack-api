import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly jwt: JwtService,
    ) {}

    getAllUsers() {
        return this.usersRepository.getAllUsers();
    }

    async getUserById(id: number, sub?: number) {
        const user = await this.usersRepository.getUserById(id);
        if(!user) throw new NotFoundException(`User with id ${id} not found`);
        return user;
    }

    async createUser(data: CreateUserDto) {
        // check if email already exists
        const existingEmail = await this.usersRepository.getEmail(data.email);
        if(existingEmail !== null) throw new ConflictException('Email already registered'); 
        
        const hashedPassword = await bcrypt.hash(data.password, 10);
        return this.usersRepository.createUser(data, hashedPassword);
    }

    async deleteUser(id: number) {
        const user = await this.usersRepository.getUserById(id);
        if(!user) throw new NotFoundException(`Id not found`);
        return this.usersRepository.deleteUser(id);
    }
}

