import { Request, Response } from 'express';
import { Product } from '../entity';
import {
  addProductCategories,
  addProductOptions,
  createProductWithParams,
  mapProduct,
} from '../helpers/ProductHelper';
import {
  getProducts,
  getProductById,
  addProduct,
  modifyProduct,
  removeProduct,
  getProductsWithOptions,
} from '../services';

const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  const products: Product[] = await getProducts();

  if (!products) {
    res.status(404);
  }
  res.status(200).json(products);
};

const getAllProductsExtended = async (
  req: Request,
  res: Response
): Promise<void> => {
  const products: Product[] = await getProductsWithOptions();

  if (!products) {
    res.status(404);
  }
  res.status(200).json(products);
};

const getProduct = async (req: Request, res: Response): Promise<void> => {
  const productId = req.params.id;
  const product: Product = await getProductById(productId);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.status(200).json(product);
};

const createProduct = async (req: Request, res: Response): Promise<void> => {
  const productName = req.body.name;
  const productDescription = req.body.description;
  const productPrice = req.body.price;
  const productStock = req.body.stock;
  const productOptions: string[] = req.body.options;
  const productCategories: string[] = req.body.categories;

  let productToCreate: Product = createProductWithParams(
    productName,
    productDescription,
    productPrice,
    productStock
  );

  if (productOptions) {
    productToCreate = await addProductOptions(productToCreate, productOptions);
  }

  if (productCategories) {
    productToCreate = await addProductCategories(
      productToCreate,
      productCategories
    );
  }

  const createdProduct: Product = await addProduct(productToCreate);

  if (!createdProduct) {
    res.status(500);
  }

  res.status(201).json(createdProduct);
};

const updateProduct = async (req: Request, res: Response): Promise<void> => {
  const productId = req.params.id;
  let productToUpdate: Product = await getProductById(productId);

  if (!productToUpdate) {
    res.status(404);
    throw new Error('Product not found');
  }

  productToUpdate = mapProduct(req, productToUpdate);

  const updatedProduct: Product = await modifyProduct(productToUpdate);

  if (!updatedProduct) {
    res.status(404);
    throw new Error('Product not updated');
  }

  res.status(204).json(updatedProduct);
};

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const productId = req.params.id;
  const productToDelete = await getProductById(productId);

  const deletedProduct = await removeProduct(productToDelete);

  if (!deletedProduct) {
    res.status(404);
  }

  res.json(deletedProduct);
  res.status(204);
};

export {
  getAllProducts,
  getAllProductsExtended,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
