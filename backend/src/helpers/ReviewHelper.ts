import { Request } from 'express';
import { AppDataSource } from '../config/data-source';
import { Product, Review } from '../entity';

const review = AppDataSource.getRepository(Review);

export const createReviewWithParams = (
  rating: number,
  comment: string,
  product: Product
) => {
  const createdReview = review.create({
    rating: rating,
    comment: comment,
    product: product,
  });

  return createdReview;
};

export const mapReview = (req: Request, review: Review): Review => {
  review.rating = req.body.rating || review.rating;
  review.comment = req.body.comment || review.comment;
  review.updatedAt = req.body.updatedAt || review.updatedAt;

  return review;
};
