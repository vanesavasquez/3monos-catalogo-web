import { act, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import type { Product } from '@modules/catalog';
import { CartProvider, useCart } from '../context/CartContext';

const PRODUCT_A: Product = {
  id: 'maceta-pensador-zen',
  name: 'Maceta Pensador Zen',
  category: 'macetas',
  price: 4800,
  imageFile: '05b8a963ee05f060.jpg',
  pastelHex: '#FDF0CF',
};

const wrapper = ({ children }: { children: ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe('CartContext (mínimo 10 u. inicial + incremento de a 1 u., Opción A)', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('agrega 10 unidades el primer clic y luego suma de a 1 unidad', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addTen(PRODUCT_A);
    });
    expect(result.current.totalUnits).toBe(10);
    expect(result.current.referenceSubtotal).toBe(48000);

    act(() => {
      result.current.addTen(PRODUCT_A);
    });
    expect(result.current.totalUnits).toBe(11);
    expect(result.current.referenceSubtotal).toBe(52800);

    act(() => {
      result.current.addTen(PRODUCT_A);
    });
    expect(result.current.totalUnits).toBe(12);
    expect(result.current.referenceSubtotal).toBe(57600);
  });

  it('resta de a 1 unidad y mantiene el tope fijo en 10 unidades (Opción A)', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addTen(PRODUCT_A); // 10
      result.current.addTen(PRODUCT_A); // 11
      result.current.addTen(PRODUCT_A); // 12
    });
    expect(result.current.totalUnits).toBe(12);

    act(() => {
      result.current.removeTen(PRODUCT_A.id);
    });
    expect(result.current.totalUnits).toBe(11);

    act(() => {
      result.current.removeTen(PRODUCT_A.id);
    });
    expect(result.current.totalUnits).toBe(10);

    // Intento bajar de 10 u.: se mantiene en el tope fijo de 10 u.
    act(() => {
      result.current.removeTen(PRODUCT_A.id);
    });
    expect(result.current.items).toHaveLength(1);
    expect(result.current.totalUnits).toBe(10);

    // Sólo se elimina con removeItem (papelera)
    act(() => {
      result.current.removeItem(PRODUCT_A.id);
    });
    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalUnits).toBe(0);
  });
});
