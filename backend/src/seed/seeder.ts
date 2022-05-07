import { AppDataSource } from '../config/data-source';
import {
  Category,
  Option,
  OrderItem,
  Product,
  Customer,
  Employee,
  Review,
} from '../entity';
import {
  addCategory,
  addOption,
  addOrderItem,
  addProduct,
  addCustomer,
  getProductByName,
  addEmployee,
} from '../services';

import { categories } from './categories';
import { options } from './options';
import { products } from './products';
import { orderItems } from './orderItems';
import { customers } from './customers';
import { employees } from './employees';

import {
  addProductReview,
  createProductWithParams,
} from '../helpers/ProductHelper';
import { createOptionWithParams } from '../helpers/OptionHelper';
import { createCategoryWithParams } from '../helpers/CategoryHelper';
import { createOrderItemWithParams } from '../helpers/OrderItemHelper';
import { createCustomerWithParams } from '../helpers/CustomerHelper';
import { createEmployeeWithParams } from '../helpers/EmployeeHelper';
import { createReviewWithParams } from '../helpers/ReviewHelper';

export const seedAll = async () => {
  await seedOptions();
  await seedCategories();
  await seedProducts();
  await seedCustomers();
  await seedEmployees();
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

    product.reviews.map((review) => {
      let newReview: Review = createReviewWithParams(
        review.rating,
        review.comment,
        newProduct
      );
      addProductReview(newProduct, newReview);
    });

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

const seedCustomers = async (): Promise<void> => {
  customers.map(async (customer) => {
    let newCustomer: Customer = createCustomerWithParams(
      customer.firstName,
      customer.lastName,
      customer.email,
      customer.phone
    );
    await addCustomer(newCustomer);
  });
};

const seedEmployees = async (): Promise<void> => {
  employees.map(async (employee) => {
    let newEmployee: Employee = createEmployeeWithParams(
      employee.firstName,
      employee.lastName,
      employee.email,
      employee.phone,
      employee.position
    );
    await addEmployee(newEmployee);
  });
};
