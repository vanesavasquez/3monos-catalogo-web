import { Trash2, Minus, Plus } from 'lucide-react';
import { BRAND_CONFIG } from '@core/config/brand.config';
import { UpcomingPlaceholder, formatCurrency } from '@shared/index';
import { getCatalogImageUrl } from '@modules/catalog';
import type { CartItem } from '../types/cart.types';
import './CartItemRow.css';

interface CartItemRowProps {
  item: CartItem;
  onAdd?: () => void;
  onRemove?: () => void;
  onChangeQty?: (quantity: number) => void;
  onDelete: () => void;
  onAddTen?: () => void;
  onRemoveTen?: () => void;
}

export function CartItemRow({
  item,
  onAdd,
  onRemove,
  onChangeQty,
  onDelete,
  onAddTen,
  onRemoveTen,
}: CartItemRowProps) {
  const imageUrl = getCatalogImageUrl(item.product.imageFile);
  const showPrices = BRAND_CONFIG.wholesale.showPrices;
  const handleAdd = onAdd ?? onAddTen ?? (() => {});
  const handleRemove = onRemove ?? onRemoveTen ?? (() => {});

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
            title="Quitar del pedido"
          >
            <Trash2 size={16} />
          </button>
        </div>

        <span className="cart-item__meta">
          {showPrices && `${formatCurrency(item.product.price)} c/u · `}
          Código: {item.product.code}
        </span>

        <div className="cart-item__controls">
          <button
            type="button"
            className="cart-item__step-btn"
            onClick={handleRemove}
            aria-label={`Restar 1 unidad de ${item.product.name}`}
            title="Restar 1 unidad"
          >
            <Minus size={14} strokeWidth={2.5} />
          </button>

          <input
            type="number"
            min="0"
            className="cart-item__input"
            value={item.quantity}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              if (onChangeQty) {
                onChangeQty(isNaN(val) ? 0 : val);
              }
            }}
            aria-label={`Cantidad de ${item.product.name}`}
          />

          <button
            type="button"
            className="cart-item__step-btn"
            onClick={handleAdd}
            aria-label={`Sumar 1 unidad de ${item.product.name}`}
            title="Sumar 1 unidad"
          >
            <Plus size={14} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </li>
  );
}
