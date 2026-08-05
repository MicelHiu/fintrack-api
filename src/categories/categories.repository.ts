import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesRepository {
    constructor(private readonly prisma: PrismaService) {}

    getAllCategories() {
        return this.prisma.categories.findMany();
    }

    getCategoryById(id: number) {
        return this.prisma.categories.findUnique({where: {id}});
    }

    createCategory(dto: CreateCategoryDto) {
        return this.prisma.categories.create({
            data: dto,
        });
    }

    updateCategory(dto: UpdateCategoryDto, id: number) {
        return this.prisma.categories.update({
            data: dto,
            where: { id },
        });
    }

    async deleteCategory(id: number) {
        const deleted = await this.prisma.categories.delete({where: {id}});

        if(deleted) {
            return { 
                message: 'Category deleted',
                status: 203,
                id: id,
            };
        }
    }
}