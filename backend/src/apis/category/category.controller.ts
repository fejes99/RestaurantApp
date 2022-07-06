import { Request, Response } from 'express';

import { Category } from './category.model';
import {
  addCategory,
  getCategories,
  getCategoryById,
  getCategoryProducts,
  modifyCategory,
  removeCategory,
} from './category.service';

const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories: Category[] = await getCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json('Server error');
  }
};

const getCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const categoryId = req.params.id;
    const category: Category = await getCategoryById(categoryId);
    res.status(200).json(category);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const categoryName = req.body.name;
    const categoryDescription = req.body.description;

    const createdCategory: Category = await addCategory(
      categoryName,
      categoryDescription
    );

    res.status(201).json(createdCategory);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const categoryId = req.params.id;
    const updatedCategory: Category = await modifyCategory(categoryId, req);
    res.status(204).json(updatedCategory);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const categoryId = req.params.id;
    const deletedCategory = await removeCategory(categoryId);
    res.status(204).json(deletedCategory);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

export {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
