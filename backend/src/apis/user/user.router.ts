import express from 'express';
import { protect } from '../../middlewares/authMiddleware';
import {
  deleteUser,
  getAllUsers,
  updateUser,
  getUser,
} from './user.controller';

const router = express.Router();

router.route('/profile/:id').get(getUser);
router.route('/profile/:id').put(updateUser);
router.route('/all').get(getAllUsers);
router.route('/:id').delete(deleteUser);

export default router;
