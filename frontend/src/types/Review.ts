import { Product } from '.';

export type Review = {
  id: string;
  rating: Rating;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  product: Product;
};

type Rating = 1 | 2 | 3 | 4 | 5;
