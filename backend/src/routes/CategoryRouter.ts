import express from 'express';
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from '../controllers';

const router = express.Router();

router.route('/').get(getAllCategories);
router.route('/:id').get(getCategory);
router.route('/').post(createCategory);
router.route('/:id').put(updateCategory);
router.route('/:id').delete(deleteCategory);

export default router;
