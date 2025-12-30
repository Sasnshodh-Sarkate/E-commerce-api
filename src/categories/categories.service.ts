import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const existing = await this.categoryRepo.findOne({
      where: { name: createCategoryDto.name },
    });

    if (existing) {
      throw new ConflictException('Category with this name already exists');
    }

    const categorie = this.categoryRepo.create(createCategoryDto);
    return await this.categoryRepo.save(categorie);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepo.find({ relations: ['products'] });
  }

  async findOne(id: string): Promise<Category> {
    const categorie = await this.categoryRepo.findOne({
      where: { id },
      relations: ['products'],
    });

    if (!categorie) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }

    return categorie;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);
    const updated = this.categoryRepo.merge(category, updateCategoryDto);
    return await this.categoryRepo.save(updated);
  }

  async remove(id: string) {
    const result = await this.categoryRepo.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }

    return { message: 'Category deleted successfully' };
  }
}
