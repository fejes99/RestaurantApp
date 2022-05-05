import { Request } from 'express';
import { AppDataSource } from '../config/data-source';
import { Category } from '../entity';

const categoryRepository = AppDataSource.getRepository(Category);

export const mapCategory = (req: Request, category: Category): Category => {
  category.name = req.body.name || category.name;
  category.description = req.body.description || category.description;
  return category;
};

export const createCategoryWithParams = (
  name: string,
  description?: string
): Category => {
  const createdCategory = categoryRepository.create({
    name: name,
    description: description,
  });
  return createdCategory;
};
