import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthRepository {
    constructor(private readonly prisma: PrismaService) {}

    getEmail(email: string) {
        return this.prisma.users.findUnique({
            where: {email},
            select: {
                id: true,
                role: true,
            }
        });
    }

    async getPassword(email: string): Promise<string | null> {
        const user = await this.prisma.users.findUnique({
            where: {email},
            select: { password: true},
        });

        return user?.password || null;
    }

    createUser(dto: RegisterDto, hashedPassword: string) {
        return this.prisma.users.create({
            data: {
                name: dto.name,
                email: dto.email,
                password: hashedPassword,
                role: 'user',
            },
            omit: { password: true},
        });
    }

    getUserById(id: number) {
        return this.prisma.users.findUnique({where: {id}});
    }

    /* updateRefreshToken(id: number, refreshToken: string) {
        return this.prisma.users.update({
            where: {id: id},
            data: {refresh_token: refreshToken},
        })
    }
 */
}