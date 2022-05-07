import { Request, Response } from 'express';
import { Product, Review } from '../entity';
import {
  addProductReview,
  removeProductReview,
} from '../helpers/ProductHelper';
import { createReviewWithParams, mapReview } from '../helpers/ReviewHelper';

import {
  getReviews,
  getReviewById,
  addReview,
  modifyReview,
  removeReview,
  getReviewsForProductId,
  getProductById,
  getProductByIdExtended,
  getProductByReview,
  getReviewByIdExtended,
} from '../services';

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
  const product: Product = await getProductByIdExtended(reviewProduct);

  const reviewToCreate: Review = createReviewWithParams(
    reviewRating,
    reviewComment,
    product
  );

  const createdReview: Review = await addReview(reviewToCreate);
  const updatedProduct: Product = await addProductReview(
    product,
    createdReview
  );

  if (!updatedProduct) {
    res.status(500);
  }

  res.status(201).json(updatedProduct);
};

const updateReview = async (req: Request, res: Response): Promise<void> => {
  const reviewId = req.params.id;
  let reviewToUpdate: Review = await getReviewById(reviewId);

  if (!reviewToUpdate) {
    res.status(404);
    throw new Error('Review not found');
  }

  reviewToUpdate = mapReview(req, reviewToUpdate);

  const updatedReview: Review = await modifyReview(reviewToUpdate);

  if (!updatedReview) {
    res.status(404);
    throw new Error('Review not updated');
  }

  res.status(204).json(updatedReview);
};

const deleteReview = async (req: Request, res: Response): Promise<void> => {
  const reviewId = req.params.id;
  const reviewToDelete = await getReviewByIdExtended(reviewId);
  const reviewProduct = reviewToDelete.product.id;

  const product: Product = await getProductByIdExtended(reviewProduct);

  const updatedProduct: Product = await removeProductReview(
    product,
    reviewToDelete
  );

  if (!updatedProduct) {
    res.status(404);
  }

  res.status(204).json(updatedProduct);

  // const deletedReview = await removeReview(reviewToDelete);

  // if (!deletedReview) {
  //   res.status(404);
  // }

  // res.json(deletedReview);
  // res.status(204);
};

export {
  getAllReviews,
  getAllReviewsForProduct,
  getReview,
  createReview,
  updateReview,
  deleteReview,
};
