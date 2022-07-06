import { MigrationInterface, QueryRunner } from 'typeorm';
import { createCategoryWithParams } from '../apis/category/category.helper';
import { categories } from '../apis/category/category.seed';
import { employees } from '../apis/employee/employee.seed';
import { options } from '../apis/option/option.seed';
import { products } from '../apis/product/product.seed';

export class Initial1654369336518 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connect();

    await queryRunner.manager.insert('User', {
      name: 'test',
      email: 'test@mail.com',
      password: 'test123',
    });

    categories.map(async (category) => {
      await queryRunner.manager.insert('Category', {
        name: category.name,
        description: category.description,
      });
    });

    employees.map(async (employee) => {
      await queryRunner.manager.insert('Employee', {
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phone: employee.phone,
        position: employee.position,
      });
    });

    options.map(async (option) => {
      await queryRunner.manager.insert('Option', {
        name: option.name,
        description: option.description,
      });
    });

    products.map(async (product) => {
      // let categoryList;
      // for (let category in product.categories) {
      //   let cat = createCategoryWithParams(category);

      //   categoryList = [...categoryList, cat];
      // }

      await queryRunner.manager.insert('Product', {
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        // categories: categoryList,
      });
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropDatabase('restaurantApp');
  }
}
