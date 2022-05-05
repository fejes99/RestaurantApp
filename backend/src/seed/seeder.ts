import { AppDataSource } from '../config/data-source';
import {
  Category,
  Option,
  OrderItem,
  Product,
  Restaurant,
  User,
} from '../entity';
import {
  addProductOptions,
  addProductCategories,
  createProductWithParams,
} from '../helpers/ProductHelper';
import {
  addCategory,
  addOption,
  addOrderItem,
  addProduct,
  addRestaurant,
  addUser,
  getProductById,
  getProductByName,
} from '../services';
import { categories } from './categories';
import { options } from './options';
import { products } from './products';
import { orderItems } from './orderItems';
import { restaurant } from './restaurants';
import { createRestaurantWithParams } from '../helpers/RestaurantHelper';
import { createOptionWithParams } from '../helpers/OptionHelper';
import { createCategoryWithParams } from '../helpers/CategoryHelper';
import { createOrderItemWithParams } from '../helpers/OrderItemHelper';
import { createUserWithParams } from '../helpers/UserHelper';
import { users } from './users';
import { timeStamp } from 'console';

const orderItemRepository = AppDataSource.getRepository(OrderItem);

export const seedAll = async () => {
  await seedOptions();
  await seedCategories();
  await seedProducts();
  await seedRestaurant();
  await seedUsers();
  // await seedOrderItems();
};

const seedOptions = async (): Promise<void> => {
  options.map(async (option: Option) => {
    let newOption: Option = createOptionWithParams(
      option.name,
      option.description
    );
    await addOption(newOption);
  });
};

const seedCategories = async (): Promise<void> => {
  categories.map(async (category: Category) => {
    let newCategory: Category = createCategoryWithParams(
      category.name,
      category.description
    );
    await addCategory(newCategory);
  });
};

const seedProducts = async (): Promise<void> => {
  products.map(async (product) => {
    let newProduct: Product = createProductWithParams(
      product.name,
      product.description,
      product.price,
      product.stock
    );

    await addProduct(newProduct);
  });
};

const seedOrderItems = async (): Promise<void> => {
  for (let i = 0; i < orderItems.length; i++) {
    let product = await getProductByName(orderItems[i].product);
    let quantity = orderItems[i].quantity;
    let newOrderItem = createOrderItemWithParams(product, quantity);
    await addOrderItem(newOrderItem);
  }
};

const seedRestaurant = async (): Promise<void> => {
  const restaurantName = restaurant.name;
  const restaurantPhone = restaurant.phone;
  const restaurantEmail = restaurant.email;
  const restaurantActive = restaurant.active;
  const restaurantStreet = restaurant.street;
  const restaurantStreetNumber = restaurant.streetNumber;
  const restaurantCity = restaurant.city;
  const restaurantCountry = restaurant.country;

  const restaurantSeed: Restaurant = createRestaurantWithParams(
    restaurantName,
    restaurantPhone,
    restaurantEmail,
    restaurantActive,
    restaurantStreet,
    restaurantStreetNumber,
    restaurantCity,
    restaurantCountry
  );

  await addRestaurant(restaurantSeed);
};

const seedUsers = async (): Promise<void> => {
  users.map(async (user) => {
    let newUser: User = createUserWithParams(
      user.firstName,
      user.lastName,
      user.email,
      user.phone
    );
    await addUser(newUser);
  });
};
