import { act, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import type { Product } from '@modules/catalog';
import { CartProvider, useCart } from '../context/CartContext';

const PRODUCT_A: Product = {
  id: 'maceta-pensador-zen',
  code: '3DM-001',
  name: 'Maceta Pensador Zen',
  category: 'macetas',
  price: 4800,
  imageFile: '05b8a963ee05f060.jpg',
  pastelHex: '#FDF0CF',
};

const PRODUCT_B: Product = {
  id: 'maceta-calada-art-deco',
  code: '3DM-002',
  name: 'Maceta Calada Art Déco',
  category: 'macetas',
  price: 5200,
  imageFile: '0d39315a5f6aa94c.jpg',
  pastelHex: '#F7D4D6',
};

const wrapper = ({ children }: { children: ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe('CartContext (mínimo global de 10 u. surtidas y control unitario)', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('suma de a 1 unidad por producto y valida el mínimo mayorista global de 10 u.', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addUnit(PRODUCT_A);
    });
    expect(result.current.totalUnits).toBe(1);
    expect(result.current.canQuote).toBe(false);
    expect(result.current.remainingForMin).toBe(9);

    // Sumar 4 más de A y 5 de B = 10 unidades surtidas
    act(() => {
      for (let i = 0; i < 4; i++) result.current.addUnit(PRODUCT_A);
      for (let i = 0; i < 5; i++) result.current.addUnit(PRODUCT_B);
    });
    expect(result.current.totalUnits).toBe(10);
    expect(result.current.canQuote).toBe(true);
    expect(result.current.remainingForMin).toBe(0);
  });

  it('resta de a 1 unidad y elimina el producto al llegar a 0 unidades', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addUnit(PRODUCT_A); // 1
      result.current.addUnit(PRODUCT_A); // 2
    });
    expect(result.current.totalUnits).toBe(2);

    act(() => {
      result.current.removeUnit(PRODUCT_A.id);
    });
    expect(result.current.totalUnits).toBe(1);

    // Al restar cuando tiene 1 u., llega a 0 y se elimina
    act(() => {
      result.current.removeUnit(PRODUCT_A.id);
    });
    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalUnits).toBe(0);
  });

  it('permite actualizar cantidad arbitraria con setProductQuantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.setProductQuantity(PRODUCT_A, 7);
    });
    expect(result.current.totalUnits).toBe(7);

    act(() => {
      result.current.setProductQuantity(PRODUCT_A, 0);
    });
    expect(result.current.items).toHaveLength(0);
  });
});
