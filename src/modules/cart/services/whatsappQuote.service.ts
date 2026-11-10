import { BRAND_CONFIG } from '@core/config/brand.config';
import { formatCurrency } from '@shared/index';
import type { CartItem } from '../types/cart.types';

export function buildWhatsappQuoteText(items: CartItem[]): string {
  if (items.length === 0) {
    return '¡Hola 3 Monos! Quiero consultar por un pedido mayorista del catálogo.';
  }

  const showPrices = BRAND_CONFIG.wholesale.showPrices;
  const totalUnits = items.reduce((sum, item) => sum + item.quantity, 0);
  const referenceSubtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const lines = items.map((item, idx) => {
    if (showPrices) {
      return `${idx + 1}. ${item.product.name} (${item.product.code}) — ${item.quantity} u. (ref. ${formatCurrency(
        item.product.price,
      )} c/u)`;
    }
    return `${idx + 1}. ${item.product.name} (${item.product.code}) — ${item.quantity} u.`;
  });

  const messageParts = [
    '¡Hola 3 Monos! Quiero cotizar este pedido mayorista:',
    '',
    ...lines,
    '',
    `Total de piezas: ${totalUnits} unidades`,
  ];

  if (showPrices) {
    messageParts.push(
      `Referencia minorista: ${formatCurrency(referenceSubtotal)} (aplicar descuento mayorista)`,
    );
  }

  messageParts.push(
    `Condición: ${BRAND_CONFIG.wholesale.depositPercent}% de seña (${BRAND_CONFIG.wholesale.paymentMethods})`,
    showPrices
      ? '¿Me confirmás colores, medidas y demora?'
      : '¿Me confirmás cotización mayorista, colores, medidas y demora?',
  );

  return messageParts.join('\n');
}

export function buildWhatsappQuoteUrl(items: CartItem[]): string {
  const message = buildWhatsappQuoteText(items);
  return `${BRAND_CONFIG.whatsapp.baseUrl}?text=${encodeURIComponent(message)}`;
}
