import { products } from './product.seed';
import { Request, Response } from 'express';
import {
  createProductWithParams,
  addProductOptionsByName,
  addProductCategoriesByName,
  mapProduct,
} from './product.helper';
import { Product } from './product.model';
import {
  getProducts,
  getProductsWithOptions,
  getProductByIdExtended,
  addProduct,
  getProductById,
  modifyProduct,
  removeProduct,
} from './product.service';
import { getCategoryProducts } from '../category/category.service';

const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const keyword = req.query.keyword;
    const categoryId = req.body.categoryId;
    let products;
    console.log('categoryID: ', categoryId);
    if (categoryId) {
      products = await getCategoryProducts(categoryId);
    } else {
      products = await getProducts(keyword);
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const getAllProductsExtended = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products: Product[] = await getProductsWithOptions();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const getProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = req.params.id;
    const product: Product = await getProductByIdExtended(productId);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productName = req.body.name;
    const productDescription = req.body.description;
    const productPrice = req.body.price;
    const productStock = req.body.stock;
    const productOptions: [] = req.body.options;
    const productCategories: [] = req.body.categories;

    const createdProduct: Product = await addProduct(
      productName,
      productDescription,
      productPrice,
      productStock,
      productOptions,
      productCategories
    );

    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = req.params.id;
    const updatedProduct: Product = await modifyProduct(productId, req);

    res.status(204).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = req.params.id;
    const deletedProduct = await removeProduct(productId);
    res.status(204).json(deletedProduct);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

export {
  getAllProducts,
  getAllProductsExtended,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
