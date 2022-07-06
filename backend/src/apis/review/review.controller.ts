import { Request, Response } from 'express';
import {
  addProductReview,
  removeProductReview,
} from '../product/product.helper';
import { Product } from '../product/product.model';
import { getProductByIdExtended } from '../product/product.service';
import { createReviewWithParams, mapReview } from './review.helper';
import { Review } from './review.model';
import {
  getReviews,
  getReviewsForProductId,
  getReviewById,
  addReview,
  modifyReview,
  getReviewByIdExtended,
  removeReview,
} from './review.service';

const getAllReviews = async (req: Request, res: Response): Promise<void> => {
  const reviews: Review[] = await getReviews();

  if (!reviews) {
    res.status(404);
  }
  res.status(200).json(reviews);
};

const getAllReviewsForProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const productId = req.body.id;
  const reviews: Review[] = await getReviewsForProductId(productId);

  if (!reviews) {
    res.status(404);
  }
  res.status(200).json(reviews);
};

const getReview = async (req: Request, res: Response): Promise<void> => {
  const reviewId = req.params.id;
  const review: Review = await getReviewById(reviewId);

  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  res.status(200).json(review);
};

const createReview = async (req: Request, res: Response): Promise<void> => {
  const reviewRating = req.body.rating;
  const reviewComment = req.body.comment;
  const reviewProduct = req.body.productId;

  const createdReview: Review = await addReview(
    reviewRating,
    reviewComment,
    reviewProduct
  );

  res.status(201).json(createdReview);
};

const updateReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const reviewId = req.params.id;
    const updatedReview: Review = await modifyReview(reviewId, req);
    res.status(204).json(updatedReview);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteReview = async (req: Request, res: Response): Promise<void> => {
  const reviewId = req.params.id;
  const removedReview: Review = await removeReview(reviewId);

  res.status(204).json(removedReview);
};

export {
  getAllReviews,
  getAllReviewsForProduct,
  getReview,
  createReview,
  updateReview,
  deleteReview,
};
