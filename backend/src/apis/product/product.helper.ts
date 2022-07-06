import { Request } from 'express';
import { AppDataSource } from '../../config/data-source';
import { createCategoryWithParams } from '../category/category.helper';
import { Category } from '../category/category.model';
import { getCategoryByName } from '../category/category.service';
import { createOptionWithParams } from '../option/option.helper';
import { Option } from '../option/option.model';
import { getOptionByName } from '../option/option.service';
import { Review } from '../review/review.model';
import { Product } from './product.model';
import { modifyProduct } from './product.service';

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

export const mapProduct = async (
  req: Request,
  product: Product
): Promise<Product> => {
  product.name = req.body.name || product.name;
  product.description = req.body.description || product.description;
  product.price = req.body.price || product.price;
  product.updatedAt = req.body.updatedAt || product.updatedAt;
  product.stock = req.body.stock || product.stock;

  if (req.body.options) {
    product = await addProductOptions(product, req.body.options);
  }

  if (req.body.categories) {
    product = await addProductCategories(product, req.body.categories);
  }

  if (req.body.reviews) {
    req.body.reviews.forEach(async (review) => {
      product = await addProductReview(product, review);
    });
  }

  return product;
};

export const addProductOptions = async (
  product: Product,
  options: Option[]
): Promise<Product> => {
  options.forEach((option) => {
    product.options = [...product.options, option];
  });

  return product;
};

export const addProductOptionsByName = async (
  product: Product,
  options: string[]
): Promise<Product> => {
  for (let option in options) {
    let productOption: Option = await getOptionByName(options[option]);

    if (productOption == null) {
      await createOptionWithParams(options[option], null);
    }

    product.options = [...product.options, productOption];
  }

  return product;
};

export const addProductCategories = async (
  product: Product,
  categories: Category[]
): Promise<Product> => {
  categories.forEach((category) => {
    product.categories = [...product.categories, category];
  });

  return product;
};

export const addProductCategoriesByName = async (
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

  const updatedProduct: Product = await modifyProductHelper(product);
  return updatedProduct;
};

export const addProductReview = async (
  product: Product,
  review: Review
): Promise<Product> => {
  product.reviews.push(review);
  const productToUpdate: Product = recalculateReviewAverage(product);

  const updatedProduct: Product = await modifyProductHelper(productToUpdate);
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

  const updatedProduct: Product = await modifyProductHelper(productToUpdate);
  return updatedProduct;
};

const modifyProductHelper = async (product: Product) => {
  const modifiedProduct = await productRepository.save(product);
  return modifiedProduct;
};

const recalculateReviewAverage = (product: Product): Product => {
  product.numberOfReviews = product.reviews.length;
  let sum = product.reviews.reduce((acc, review) => review.rating + acc, 0);
  sum = 0
    ? (product.reviewAverage = 0)
    : (product.reviewAverage = sum / product.numberOfReviews);

  return product;
};
