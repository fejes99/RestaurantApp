export const products = [
  {
    name: 'hamburger',
    description: 'tasty hamburger',
    price: 200,
    stock: 100,
    options: ['tomato', 'onion'],
    categories: ['food', 'hot'],
    reviews: [
      {
        rating: 5,
        comment: 'Very delicious',
      },
      {
        rating: 3,
        comment: 'Too spicy',
      },
      {
        rating: 1,
        comment: 'Roasted',
      },
      {
        rating: 1,
        comment: 'Too small',
      },
      {
        rating: 2,
        comment: 'Cold',
      },
    ],
  },
  {
    name: 'cheeseburger',
    description: 'sweet cheeseburger',
    price: 250,
    stock: 50,
    options: ['tomato', 'onion', 'cheese'],
    categories: ['food', 'sweet'],
    reviews: [
      {
        rating: 3,
        comment: 'Little cheese',
      },
      {
        rating: 2,
        comment: 'Not tasty',
      },
      {
        rating: 4,
        comment: 'Nice cheese',
      },
      {
        rating: 1,
        comment: 'No cheese at all',
      },
    ],
  },
  {
    name: 'cola',
    description: 'tasty cold cola',
    price: 100,
    stock: 200,
    categories: ['drink'],
    reviews: [
      {
        rating: 5,
        comment: 'Refreshing',
      },
      {
        rating: 4,
        comment: 'Too cold',
      },
    ],
  },
  {
    name: 'salad',
    description: 'easy salad',
    price: 150,
    stock: 30,
    options: ['tomato', 'onion', 'lettuce'],
    categories: ['food'],
    reviews: [
      {
        rating: 5,
        comment: 'Tasty',
      },
      {
        rating: 3,
        comment: 'A little bit spicy',
      },
      {
        rating: 4,
        comment: 'Not that fresh',
      },
    ],
  },
];
