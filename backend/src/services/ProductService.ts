import { AppDataSource } from '../config/data-source';
import { Product } from '../entity';

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
      reviews: true,
    },
  });
  return products;
};

const getProductById = async (productId): Promise<Product> => {
  const product: Product = await productRepository.findOneBy({ id: productId });
  return product;
};

const getProductByIdExtended = async (productId): Promise<Product> => {
  const product: Product = await productRepository.findOne({
    where: { id: productId },
    relations: {
      reviews: true,
    },
  });
  return product;
};

const getProductByName = async (productName: string): Promise<Product> => {
  const product: Product = await productRepository.findOneBy({
    name: productName,
  });

  return product;
};

const getProductByReview = async (review): Promise<Product> => {
  const product: Product = await productRepository
    .createQueryBuilder('product')
    .leftJoinAndSelect('product.reviews', 'reviews')
    .where('reviews.productId = :id', { id: review.product.id })
    .getOne();
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
  getProductByReview,
  addProduct,
  modifyProduct,
  removeProduct,
  getProductByIdExtended,
};
