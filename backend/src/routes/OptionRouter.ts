import express from 'express';
import {
  createOption,
  deleteOption,
  getAllOptions,
  getOption,
  updateOption,
} from '../controllers';

const router = express.Router();

router.route('/').get(getAllOptions);
router.route('/:id').get(getOption);
router.route('/').post(createOption);
router.route('/:id').put(updateOption);
router.route('/:id').delete(deleteOption);

export default router;
