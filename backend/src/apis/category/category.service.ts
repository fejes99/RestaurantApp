import { products } from './../product/product.seed';
import { AppDataSource } from '../../config/data-source';
import { createCategoryWithParams, mapCategory } from './category.helper';
import { Category } from './category.model';
import { Product } from '../product/product.model';

const categoryRepository = AppDataSource.getRepository(Category);

const getCategories = async (): Promise<Category[]> => {
  const categories: Category[] = await categoryRepository.find();
  return categories;
};

const getCategoryById = async (categoryId): Promise<Category> => {
  const category: Category = await categoryRepository.findOneBy({
    id: categoryId,
  });
  if (category === null) {
    throw new Error('Category with that id not found');
  }
  return category;
};

const getCategoryProducts = async (categoryId): Promise<Product[]> => {
  const category = await categoryRepository.findOne({
    where: { id: categoryId },
    relations: {
      products: true,
    },
  });
  if (category === null) {
    throw new Error('Category with that id not found');
  }

  const products: Product[] = category.products;

  return products;
};

const getCategoryByName = async (categoryName): Promise<Category> => {
  const category: Category = await categoryRepository.findOneBy({
    name: categoryName,
  });
  if (category === null) {
    throw new Error(`Category with name: ${categoryName} not found`);
  }
  return category;
};

const addCategory = async (
  name: string,
  description: string
): Promise<Category> => {
  const categoryToCreate: Category = createCategoryWithParams(
    name,
    description
  );
  const addedCategory: Category = await categoryRepository.save(
    categoryToCreate
  );
  if (addedCategory === null) {
    throw new Error('Category not created');
  }
  return addedCategory;
};

const modifyCategory = async (id, req): Promise<Category> => {
  const category: Category = await getCategoryById(id);

  const categoryToModify: Category = mapCategory(req, category);

  const modifiedCategory: Category = await categoryRepository.save(
    categoryToModify
  );
  if (modifiedCategory === null) {
    throw new Error('Category not modified');
  }
  return modifiedCategory;
};

const removeCategory = async (id): Promise<Category> => {
  const categoryToRemove: Category = await getCategoryById(id);

  const removedCategory: Category = await categoryRepository.remove(
    categoryToRemove
  );
  if (removedCategory === null) {
    throw new Error('Category not removed');
  }
  return removedCategory;
};

export {
  getCategories,
  getCategoryById,
  getCategoryByName,
  getCategoryProducts,
  addCategory,
  modifyCategory,
  removeCategory,
};
