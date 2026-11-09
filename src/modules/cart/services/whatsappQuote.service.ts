import { BRAND_CONFIG } from '@core/config/brand.config';
import { formatCurrency } from '@shared/index';
import type { CartItem } from '../types/cart.types';

export function buildWhatsappQuoteText(items: CartItem[]): string {
  if (items.length === 0) {
    return '¡Hola 3 Monos! Quiero consultar por un pedido mayorista del catálogo.';
  }

  const totalUnits = items.reduce((sum, item) => sum + item.quantity, 0);
  const referenceSubtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const lines = items.map(
    (item, idx) =>
      `${idx + 1}. ${item.product.name} — ${item.quantity} u. (ref. ${formatCurrency(
        item.product.price,
      )} c/u)`,
  );

  return [
    '¡Hola 3 Monos! Quiero cotizar este pedido mayorista:',
    '',
    ...lines,
    '',
    `Total de piezas: ${totalUnits} unidades`,
    `Referencia minorista: ${formatCurrency(referenceSubtotal)} (aplicar descuento mayorista)`,
    `Condición: ${BRAND_CONFIG.wholesale.depositPercent}% de seña (${BRAND_CONFIG.wholesale.paymentMethods})`,
    '¿Me confirmás colores, medidas y demora?',
  ].join('\n');
}

export function buildWhatsappQuoteUrl(items: CartItem[]): string {
  const message = buildWhatsappQuoteText(items);
  return `${BRAND_CONFIG.whatsapp.baseUrl}?text=${encodeURIComponent(message)}`;
}
