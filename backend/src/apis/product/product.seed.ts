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
        comment: 'very good',
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
        rating: 5,
        comment: 'perfect',
      },
      {
        rating: 4,
        comment: 'too much souce',
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
        comment: 'tasty',
      },
      {
        rating: 3,
        comment: 'cold',
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
        rating: 1,
        comment: 'not good at all',
      },
      {
        rating: 5,
        comment: 'excellent',
      },
      {
        rating: 3,
        comment: 'cold',
      },
    ],
  },
];
