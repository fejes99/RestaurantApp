import express from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from '../controllers';

const router = express.Router();

router.route('/').get(getAllUsers);
router.route('/:id').get(getUser);
router.route('/').post(createUser);
router.route('/:id').put(updateUser);
router.route('/:id').delete(deleteUser);

export default router;
