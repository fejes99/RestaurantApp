import express from 'express';
import {
  getAllOptions,
  getOption,
  createOption,
  updateOption,
  deleteOption,
} from './option.controller';

const router = express.Router();

router.route('/').get(getAllOptions);
router.route('/:id').get(getOption);
router.route('/').post(createOption);
router.route('/:id').put(updateOption);
router.route('/:id').delete(deleteOption);

export default router;
