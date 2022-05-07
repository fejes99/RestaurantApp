import { Request } from 'express';
import { AppDataSource } from '../config/data-source';
import { Category, Option, Product, Review } from '../entity';
import { getCategoryByName, getOptionByName, modifyProduct } from '../services';
import { createCategoryWithParams } from './CategoryHelper';
import { createReviewWithParams } from './ReviewHelper';

const productRepository = AppDataSource.getRepository(Product);

export const createProductWithParams = (
  name: string,
  description: string,
  price: number,
  stock: number
): Product => {
  const createdProduct: Product = productRepository.create({
    name: name,
    description: description,
    price: price,
    stock: stock,
    options: [],
    categories: [],
    reviews: [],
  });

  return createdProduct;
};

export const mapProduct = (req: Request, product: Product): Product => {
  product.name = req.body.name || product.name;
  product.description = req.body.description || product.description;
  product.price = req.body.price || product.price;
  product.updatedAt = req.body.updatedAt || product.updatedAt;
  product.stock = req.body.stock || product.stock;

  return product;
};

export const addProductOptions = async (
  product: Product,
  options: string[]
): Promise<Product> => {
  for (let option in options) {
    let productOption: Option = await getOptionByName(options[option]);

    product.options = [...product.options, productOption];
  }

  return product;
};

export const addProductCategories = async (
  product: Product,
  categories: string[]
): Promise<Product> => {
  for (let category in categories) {
    let productCategory: Category = await getCategoryByName(
      categories[category]
    );

    if (productCategory == null) {
      await createCategoryWithParams(categories[category]);
    }

    product.categories = [...product.categories, productCategory];
  }

  return product;
};

export const reduceProductInStock = async (
  quantity: number,
  product: Product
) => {
  product.stock -= quantity;

  const updatedProduct: Product = await modifyProduct(product);
  return updatedProduct;
};

export const addProductReview = async (
  product: Product,
  review: Review
): Promise<Product> => {
  product.reviews.push(review);
  const productToUpdate: Product = recalculateReviewAverage(product);

  const updatedProduct: Product = await modifyProduct(productToUpdate);
  return updatedProduct;
};

export const removeProductReview = async (
  product: Product,
  reviewToRemove: Review
): Promise<Product> => {
  product.reviews = product.reviews.filter(
    (review) => review.id !== reviewToRemove.id
  );

  const productToUpdate: Product = recalculateReviewAverage(product);

  const updatedProduct: Product = await modifyProduct(productToUpdate);
  return updatedProduct;
};

const recalculateReviewAverage = (product: Product): Product => {
  product.numberOfReviews = product.reviews.length;
  let sum = product.reviews.reduce((acc, review) => review.rating + acc, 0);
  sum = 0
    ? (product.reviewAverage = 0)
    : (product.reviewAverage = sum / product.numberOfReviews);

  return product;
};
