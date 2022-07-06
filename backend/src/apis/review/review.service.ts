import { AppDataSource } from '../../config/data-source';
import {
  addProductReview,
  removeProductReview,
} from '../product/product.helper';
import { Product } from '../product/product.model';
import { getProductByIdExtended } from '../product/product.service';
import { createReviewWithParams, mapReview } from './review.helper';
import { Review } from './review.model';

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
  if (review === null) {
    throw new Error('Review with that id not found');
  }
  return review;
};
const getReviewByIdExtended = async (reviewId): Promise<Review> => {
  const review: Review = await reviewRepository.findOne({
    where: { id: reviewId },
    relations: { product: true },
  });
  if (review === null) {
    throw new Error('Review with that id not found');
  }
  return review;
};

const addReview = async (rating, comment, reviewProduct): Promise<Review> => {
  const product: Product = await getProductByIdExtended(reviewProduct);

  const reviewToCreate: Review = createReviewWithParams(
    rating,
    comment,
    product
  );

  const createdReview: Review = await reviewRepository.save(reviewToCreate);
  await addProductReview(product, createdReview);

  return createdReview;
};

const modifyReview = async (id, req): Promise<Review> => {
  let reviewToUpdate: Review = await getReviewById(id);

  if (!reviewToUpdate) {
    throw new Error('Review not found');
  }

  reviewToUpdate = mapReview(req, reviewToUpdate);
  const modifiedReview = await reviewRepository.save(reviewToUpdate);
  return modifiedReview;
};

const removeReview = async (id): Promise<Review> => {
  const reviewToRemove: Review = await getReviewByIdExtended(id);
  const reviewProduct = reviewToRemove.product.id;

  const product: Product = await getProductByIdExtended(reviewProduct);
  await removeProductReview(product, reviewToRemove);
  return reviewToRemove;
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
