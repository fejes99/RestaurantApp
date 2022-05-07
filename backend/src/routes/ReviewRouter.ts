import express from 'express';
import {
  getAllReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
  getAllReviewsForProduct,
} from '../controllers';

const router = express.Router();

router.route('/').get(getAllReviews);
router.route('/product/:productId').get(getAllReviewsForProduct);
router.route('/:id').get(getReview);
router.route('/').post(createReview);
router.route('/:id').put(updateReview);
router.route('/:id').delete(deleteReview);

export default router;
