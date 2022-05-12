import { Request, Response } from 'express';
import { Category } from '../entity';
import {
  createCategoryWithParams,
  mapCategory,
} from '../helpers/CategoryHelper';
import {
  addCategory,
  getCategories,
  getCategoryById,
  modifyCategory,
  removeCategory,
} from '../services';

const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  const categories: Category[] = await getCategories();

  if (!categories) {
    res.status(404);
  }
  res.status(200).json(categories);
};

const getCategory = async (req: Request, res: Response): Promise<void> => {
  const categoryId = req.params.id;
  const category = await getCategoryById(categoryId);

  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  res.status(200).json(category);
};

const createCategory = async (req: Request, res: Response): Promise<void> => {
  const categoryName = req.body.name;
  const categoryDescription = req.body.description;

  const categoryToCreate: Category = createCategoryWithParams(
    categoryName,
    categoryDescription
  );

  const createdCategory: Category = await addCategory(categoryToCreate);

  if (!createdCategory) {
    res.status(500);
  }

  res.status(201).json(createdCategory);
};

const updateCategory = async (req: Request, res: Response): Promise<void> => {
  const categoryId = req.params.id;
  let categoryToUpdate = await getCategoryById(categoryId);

  if (!categoryToUpdate) {
    res.status(404);
    throw new Error('Category not found');
  }
  categoryToUpdate = mapCategory(req, categoryToUpdate);

  const updatedCategory: Category = await modifyCategory(categoryToUpdate);

  if (!updatedCategory) {
    res.status(404);
    throw new Error('Category not updated');
  }

  res.status(204).json(updatedCategory);
};

const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  const categoryId = req.params.id;
  const categoryToDelete = await getCategoryById(categoryId);

  const deletedCategory = await removeCategory(categoryToDelete);

  if (!deletedCategory) {
    res.status(404);
  }

  res.json(deletedCategory);
  res.status(204);
};

export {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
