export type ProductCategory = 'macetas' | 'tutores' | 'juegos' | 'eventos';

export type CategoryFilterValue = 'todos' | ProductCategory;

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  imageFile?: string;
  pastelHex: string;
  isUpcoming?: boolean;
}

export interface CategoryOption {
  value: CategoryFilterValue;
  label: string;
}
