import { Request } from 'express';
import { AppDataSource } from '../config/data-source';
import { Category, Option, Product } from '../entity';
import { getCategoryByName, getOptionByName, modifyProduct } from '../services';
import { createCategoryWithParams } from './CategoryHelper';

const productRepository = AppDataSource.getRepository(Product);

export const createProductWithParams = (
  name: string,
  description: string,
  price: number,
  stock: number
) => {
  const createdProduct = productRepository.create({
    name: name,
    description: description,
    price: price,
    stock: stock,
    options: [],
    categories: [],
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
