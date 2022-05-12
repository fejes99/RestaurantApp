import { Product } from '.';

export type Category = {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  products: Product[];
};
