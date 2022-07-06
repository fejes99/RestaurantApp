import { AppDataSource } from '../../config/data-source';
import {
  createProductWithParams,
  addProductOptionsByName,
  addProductCategoriesByName,
  mapProduct,
  addProductCategories,
} from './product.helper';
import { Product } from './product.model';

const productRepository = AppDataSource.manager.getRepository(Product);

const getProducts = async (keyword): Promise<Product[]> => {
  const products: Product[] = await productRepository
    .createQueryBuilder()
    .select()
    .where('name ILIKE :keyword', { keyword: `%${keyword}%` })
    .getMany();
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
      options: true,
      categories: true,
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

const addProduct = async (
  productName,
  productDescription,
  productPrice,
  productStock,
  productOptions,
  productCategories
): Promise<Product> => {
  let productToCreate: Product = createProductWithParams(
    productName,
    productDescription,
    productPrice,
    productStock
  );

  if (productOptions !== null) {
    productToCreate = await addProductOptionsByName(
      productToCreate,
      productOptions
    );
  }

  if (productCategories !== null) {
    productToCreate = await addProductCategories(
      productToCreate,
      productCategories
    );
  }
  const addedProduct = await productRepository.save(productToCreate);
  return addedProduct;
};

const modifyProduct = async (id, req): Promise<Product> => {
  let productToUpdate: Product = await getProductById(id);

  productToUpdate = await mapProduct(req, productToUpdate);
  const modifiedProduct = await productRepository.save(productToUpdate);
  return modifiedProduct;
};

const removeProduct = async (id): Promise<Product> => {
  const productToRemove: Product = await getProductById(id);

  const removedProduct: Product = await productRepository.remove(
    productToRemove
  );
  if (removedProduct === null) {
    throw new Error('Product not removed');
  }
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
