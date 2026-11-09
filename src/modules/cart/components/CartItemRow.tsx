import { Trash2 } from 'lucide-react';
import { BRAND_CONFIG } from '@core/config/brand.config';
import { UpcomingPlaceholder, formatCurrency } from '@shared/index';
import { getCatalogImageUrl } from '@modules/catalog';
import type { CartItem } from '../types/cart.types';
import './CartItemRow.css';

interface CartItemRowProps {
  item: CartItem;
  onAddTen: () => void;
  onRemoveTen: () => void;
  onDelete: () => void;
}

export function CartItemRow({
  item,
  onAddTen,
  onRemoveTen,
  onDelete,
}: CartItemRowProps) {
  const imageUrl = getCatalogImageUrl(item.product.imageFile);
  const isAtMinUnits = item.quantity <= BRAND_CONFIG.wholesale.minOrderStep;

  return (
    <li className="cart-item">
      <div
        className="cart-item__thumb"
        style={{ backgroundColor: imageUrl ? item.product.pastelHex : '#FBE28A' }}
      >
        {imageUrl ? (
          <img src={imageUrl} alt={item.product.name} className="cart-item__img" />
        ) : (
          <UpcomingPlaceholder compact />
        )}
      </div>

      <div className="cart-item__content">
        <div className="cart-item__top">
          <span className="cart-item__name">{item.product.name}</span>
          <button
            type="button"
            className="cart-item__delete"
            onClick={onDelete}
            aria-label={`Quitar ${item.product.name} del pedido`}
          >
            <Trash2 size={16} />
          </button>
        </div>

        <span className="cart-item__unit-price">
          {formatCurrency(item.product.price)} c/u · mín. {BRAND_CONFIG.wholesale.minOrderStep} u.
        </span>

        <div className="cart-item__controls">
          <button
            type="button"
            className="cart-item__step-btn"
            onClick={onRemoveTen}
            disabled={isAtMinUnits}
            aria-label={`Restar 1 unidad de ${item.product.name}`}
            title={
              isAtMinUnits
                ? `Mínimo ${BRAND_CONFIG.wholesale.minOrderStep} unidades por producto`
                : 'Restar 1 unidad'
            }
          >
            -1
          </button>
          <span className="cart-item__qty">{item.quantity} u.</span>
          <button
            type="button"
            className="cart-item__step-btn"
            onClick={onAddTen}
            aria-label={`Sumar 1 unidad de ${item.product.name}`}
            title="Sumar 1 unidad"
          >
            +1
          </button>
        </div>
      </div>
    </li>
  );
}
