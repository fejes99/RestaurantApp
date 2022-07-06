import express from 'express';
import {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from './category.controller';

const router = express.Router();

router.route('/').get(getAllCategories);
router.route('/:id').get(getCategory);
router.route('/').post(createCategory);
router.route('/:id').put(updateCategory);
router.route('/:id').delete(deleteCategory);

export default router;
