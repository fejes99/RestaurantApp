import { Category } from '../apis/category/category.model';
import { categories } from '../apis/category/category.seed';
import { addCategory } from '../apis/category/category.service';
import { createCustomerWithParams } from '../apis/customer/customer.helper';
import { Customer } from '../apis/customer/customer.model';
import { customers } from '../apis/customer/customer.seed';
import { addCustomer } from '../apis/customer/customer.service';
import { createEmployeeWithParams } from '../apis/employee/employee.helper';
import { Employee } from '../apis/employee/employee.model';
import { employees } from '../apis/employee/employee.seed';
import { addEmployee } from '../apis/employee/employee.service';
import { createOptionWithParams } from '../apis/option/option.helper';
import { Option } from '../apis/option/option.model';
import { options } from '../apis/option/option.seed';
import { addOption } from '../apis/option/option.service';
import { createOrderItemWithParams } from '../apis/order-item/order-item.helper';
import { orderItems } from '../apis/order-item/order-item.seed';
import { addOrderItem } from '../apis/order-item/order-item.service';
import {
  createProductWithParams,
  addProductOptionsByName,
  addProductCategoriesByName,
  addProductReview,
} from '../apis/product/product.helper';
import { Product } from '../apis/product/product.model';
import { products } from '../apis/product/product.seed';
import { addProduct, getProductByName } from '../apis/product/product.service';
import { createReviewWithParams } from '../apis/review/review.helper';

export const seedAll = async () => {
  await seedOptions();
  await seedCategories();
  // await seedProducts();
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
    await addCategory(category.name, category.description);
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

    if (product.options) {
      newProduct = await addProductOptionsByName(newProduct, product.options);
    }

    if (product.categories) {
      newProduct = await addProductCategoriesByName(
        newProduct,
        product.categories
      );
    }

    if (product.reviews) {
      product.reviews.map(async (review) => {
        newProduct = await addProductReview(
          newProduct,
          createReviewWithParams(review.rating, review.comment, newProduct)
        );
      });
    }

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
