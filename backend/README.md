# Backend application for eCommerce Web Shop for faculty assignment.

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command

Express application with TypeORM.

# Entities

- Product - all information about exact product
- Option - option for product, product can contain more options
- Category - category for product, product can contain more categories
- Order item - tuple of product and quantity
- Order - order with list of order items
- Restaurant - restaurant where the order was created
- User - user who ordered
- Payment - payment details

# Routes

- Product

  - '/'
    - GET - get all products
    - POST - create product
      - '/extended'
        - GET - get all products with options and categories
      - ':id'
        - GET - get product by id
        - PUT - update product
        - DELETE - delete product

- Option

  - '/'
    - GET - get all options
    - POST - create option
      - ':id'
        - GET - get option by id
        - PUT - update option
        - DELETE - delete option

- Category

  - '/'
    - GET - get all categories
    - POST - create category
      - '/extended'
        - GET - get all categories with products
      - ':id'
        - GET - get category by id
        - PUT - update category
        - DELETE - delete category

- Restaurant

  - '/'
    - GET - get all restaurants
    - POST - create restaurant
      - ':id'
        - GET - get restaurant by id
        - PUT - update restaurant
        - DELETE - delete restaurant

- User

  - '/'
    - GET - get all users
    - POST - create user
      - ':id'
        - GET - get user by id
        - PUT - update user
        - DELETE - delete user

- Order

  - '/'
    - GET - get all orders
    - POST - create order
      - '/extended'
        - GET - get all orders with order items and products
      - ':id'
        - GET - get order by id
        - DELETE - delete order
