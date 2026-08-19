import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
    constructor(private readonly categoriesRepository: CategoriesRepository) {}
    getAllCategories() {
        return this.categoriesRepository.getAllCategories();
    }

    async getCategoryById(id: number) {
        const category = await this.categoriesRepository.getCategoryById(id);
        if(!category) throw new NotFoundException(`Category with ID ${id} not found`);
        return category;
    }

    createCategory(dto: CreateCategoryDto) {
        return this.categoriesRepository.createCategory(dto);
    }

    async updateCategory(id: number, dto: UpdateCategoryDto) {
        const category = await this.categoriesRepository.getCategoryById(id);
        if(!category) throw new NotFoundException(`Category not found`);
        console.log(dto); 
        return this.categoriesRepository.updateCategory(dto, id);
    }

    async deleteCategory(id: number) {
        const category = await this.categoriesRepository.getCategoryById(id);
        if(!category) throw new NotFoundException(`Category not found`);
        return this.categoriesRepository.deleteCategory(id);
    }
}
