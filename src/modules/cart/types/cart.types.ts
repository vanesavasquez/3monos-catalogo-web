import type { Product } from '@modules/catalog';

export interface CartItem {
  product: Product;
  quantity: number;
}
