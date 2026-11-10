import { describe, expect, it } from 'vitest';
import {
  buildWhatsappQuoteText,
  buildWhatsappQuoteUrl,
} from '../services/whatsappQuote.service';
import type { CartItem } from '../types/cart.types';

const SAMPLE_ITEMS: CartItem[] = [
  {
    product: {
      id: 'maceta-pensador-zen',
      code: '3DM-001',
      name: 'Maceta Pensador Zen',
      category: 'macetas',
      price: 4800,
      imageFile: '05b8a963ee05f060.jpg',
      pastelHex: '#FDF0CF',
    },
    quantity: 20,
  },
  {
    product: {
      id: 'maceta-calada-art-deco',
      code: '3DM-002',
      name: 'Maceta Calada Art Déco',
      category: 'macetas',
      price: 5200,
      imageFile: '0d39315a5f6aa94c.jpg',
      pastelHex: '#F7D4D6',
    },
    quantity: 10,
  },
];

describe('whatsappQuote.service', () => {
  it('incluye todos los productos seleccionados, cantidades y condiciones mayoristas', () => {
    const text = buildWhatsappQuoteText(SAMPLE_ITEMS);
    expect(text).toContain('Maceta Pensador Zen (3DM-001) — 20 u.');
    expect(text).toContain('Maceta Calada Art Déco (3DM-002) — 10 u.');
    expect(text).toContain('Total de piezas: 30 unidades');
    expect(text).toContain('50% de seña');
  });

  it('arma el link wa.me apuntando al número oficial +5492664214124', () => {
    const url = buildWhatsappQuoteUrl(SAMPLE_ITEMS);
    expect(url.startsWith('https://wa.me/5492664214124?text=')).toBe(true);
    expect(decodeURIComponent(url)).toContain('Maceta Pensador Zen');
  });
});
