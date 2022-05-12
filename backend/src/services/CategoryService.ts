import { AppDataSource } from '../config/data-source';
import { Category } from '../entity';

const categoryRepository = AppDataSource.getRepository(Category);

const getCategories = async (): Promise<Category[]> => {
  const categories = categoryRepository.find();
  return categories;
};

const getCategoryById = async (categoryId): Promise<Category> => {
  const category = categoryRepository.findOneBy({ id: categoryId });
  return category;
};

const getCategoryByName = async (categoryName): Promise<Category> => {
  const category = categoryRepository.findOneBy({ name: categoryName });
  return category;
};

const addCategory = async (category: Category): Promise<Category> => {
  const addedCategory = categoryRepository.save(category);
  return addedCategory;
};

const modifyCategory = async (category: Category): Promise<Category> => {
  const modifiedCategory = categoryRepository.save(category);
  return modifiedCategory;
};

const removeCategory = async (category: Category): Promise<Category> => {
  const removedCategory = categoryRepository.remove(category);
  return removedCategory;
};

export {
  getCategories,
  getCategoryById,
  getCategoryByName,
  addCategory,
  modifyCategory,
  removeCategory,
};
