import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateAccountDto } from 'src/accounts/dto/update-account.dto';

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

    
}
