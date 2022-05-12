import { Category } from './Category';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  numberOfReviews: number;
  reviewAverage: number;
  createdAt: Date;
  updatedAt: Date;
  options: [];
  categories: Category[];
  reviews: [];
};
