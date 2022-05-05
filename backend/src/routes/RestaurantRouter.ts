import express from 'express';
import {
  createRestaurant,
  deleteRestaurant,
  getAllRestaurants,
  getRestaurant,
  updateRestaurant,
} from '../controllers';

const router = express.Router();

router.route('/').get(getAllRestaurants);
router.route('/:id').get(getRestaurant);
router.route('/').post(createRestaurant);
router.route('/:id').put(updateRestaurant);
router.route('/:id').delete(deleteRestaurant);

export default router;
