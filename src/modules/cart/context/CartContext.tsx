import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { BRAND_CONFIG } from '@core/config/brand.config';
import type { Product } from '@modules/catalog';
import type { CartItem } from '../types/cart.types';

const STORAGE_KEY = '3monos_wholesale_cart_v1';
const MIN_TOTAL = BRAND_CONFIG.wholesale.minTotalUnits;
const UNIT_STEP = BRAND_CONFIG.wholesale.unitStep;

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  totalUnits: number;
  referenceSubtotal: number;
  canQuote: boolean;
  remainingForMin: number;
  openCart: () => void;
  closeCart: () => void;
  addUnit: (product: Product) => void;
  removeUnit: (productId: string) => void;
  setProductQuantity: (product: Product, quantity: number) => void;
  addTen: (product: Product) => void;
  removeTen: (productId: string) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function loadInitialItems(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadInitialItems);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignora restricciones de almacenamiento privado
    }
  }, [items]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addUnit = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((entry) => entry.product.id === product.id);
      if (existing) {
        return prev.map((entry) =>
          entry.product.id === product.id
            ? { ...entry, quantity: entry.quantity + UNIT_STEP }
            : entry,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const removeUnit = useCallback((productId: string) => {
    setItems((prev) =>
      prev
        .map((entry) =>
          entry.product.id === productId
            ? { ...entry, quantity: entry.quantity - UNIT_STEP }
            : entry,
        )
        .filter((entry) => entry.quantity > 0),
    );
  }, []);

  const setProductQuantity = useCallback((product: Product, quantity: number) => {
    const qty = Math.max(0, Math.floor(quantity));
    setItems((prev) => {
      if (qty <= 0) {
        return prev.filter((entry) => entry.product.id !== product.id);
      }
      const existing = prev.find((entry) => entry.product.id === product.id);
      if (existing) {
        return prev.map((entry) =>
          entry.product.id === product.id ? { ...entry, quantity: qty } : entry,
        );
      }
      return [...prev, { product, quantity: qty }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((entry) => entry.product.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalUnits = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const referenceSubtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items],
  );

  const canQuote = totalUnits >= MIN_TOTAL;
  const remainingForMin = Math.max(0, MIN_TOTAL - totalUnits);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      isOpen,
      totalUnits,
      referenceSubtotal,
      canQuote,
      remainingForMin,
      openCart,
      closeCart,
      addUnit,
      removeUnit,
      setProductQuantity,
      addTen: addUnit,
      removeTen: removeUnit,
      removeItem,
      clearCart,
    }),
    [
      items,
      isOpen,
      totalUnits,
      referenceSubtotal,
      canQuote,
      remainingForMin,
      openCart,
      closeCart,
      addUnit,
      removeUnit,
      setProductQuantity,
      removeItem,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart debe utilizarse dentro de un CartProvider');
  }
  return ctx;
}
