import { AppDataSource } from '../config/data-source';
import { Option, Product } from '../entity';

const productRepository = AppDataSource.manager.getRepository(Product);

const getProducts = async (): Promise<Product[]> => {
  const products: Product[] = await productRepository.find();
  return products;
};

const getProductsWithOptions = async (): Promise<Product[]> => {
  const products: Product[] = await productRepository.find({
    relations: {
      options: true,
      categories: true,
    },
  });
  return products;
};

const getProductById = async (productId): Promise<Product> => {
  const product = await productRepository.findOneBy({ id: productId });
  return product;
};

const getProductByName = async (productName: string): Promise<Product> => {
  const product: Product = await productRepository.findOneBy({
    name: productName,
  });

  return product;
};

const addProduct = async (product: Product): Promise<Product> => {
  const addedProduct = await productRepository.save(product);
  return addedProduct;
};

const modifyProduct = async (product: Product): Promise<Product> => {
  const modifiedProduct = await productRepository.save(product);
  return modifiedProduct;
};

const removeProduct = async (product: Product): Promise<Product> => {
  const removedProduct: Product = await productRepository.remove(product);
  return removedProduct;
};

export {
  getProducts,
  getProductsWithOptions,
  getProductById,
  getProductByName,
  addProduct,
  modifyProduct,
  removeProduct,
  // getProductByNameReturnId,
};
