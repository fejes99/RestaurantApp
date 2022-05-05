import express from 'express';
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getAllCategoriesExtended,
  getCategory,
  updateCategory,
} from '../controllers';

const router = express.Router();

router.route('/').get(getAllCategories);
router.route('/extended').get(getAllCategoriesExtended);
router.route('/:id').get(getCategory);
router.route('/').post(createCategory);
router.route('/:id').put(updateCategory);
router.route('/:id').delete(deleteCategory);

export default router;
