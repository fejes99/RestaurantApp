import { AppDataSource } from '../config/data-source';
import { Review } from '../entity';

const reviewRepository = AppDataSource.manager.getRepository(Review);

const getReviews = async (): Promise<Review[]> => {
  const reviews: Review[] = await reviewRepository.find();
  return reviews;
};

const getReviewsForProductId = async (productId): Promise<Review[]> => {
  const reviews: Review[] = await reviewRepository.find({
    where: { product: productId },
  });
  return reviews;
};

const getReviewById = async (reviewId): Promise<Review> => {
  const review: Review = await reviewRepository.findOneBy({ id: reviewId });
  return review;
};
const getReviewByIdExtended = async (reviewId): Promise<Review> => {
  const review: Review = await reviewRepository.findOne({
    where: { id: reviewId },
    relations: { product: true },
  });
  return review;
};

const addReview = async (review: Review): Promise<Review> => {
  const addedReview = await reviewRepository.save(review);
  return addedReview;
};

const modifyReview = async (review: Review): Promise<Review> => {
  const modifiedReview = await reviewRepository.save(review);
  return modifiedReview;
};

const removeReview = async (review: Review): Promise<Review> => {
  const removedReview = await reviewRepository.save(review);
  return removedReview;
};

export {
  getReviews,
  getReviewsForProductId,
  getReviewById,
  getReviewByIdExtended,
  addReview,
  modifyReview,
  removeReview,
};
