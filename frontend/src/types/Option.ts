import { Product } from '.';

export type Option = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  products: Product[];
};
