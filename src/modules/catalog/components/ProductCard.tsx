import { Plus, Minus, ZoomIn } from 'lucide-react';
import { UpcomingPlaceholder, formatCurrency } from '@shared/index';
import { BRAND_CONFIG } from '@core/config/brand.config';
import { getCatalogImageUrl } from '../data/imageLoader';
import type { Product } from '../types/catalog.types';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  quantityInCart: number;
  onAddUnit?: (product: Product) => void;
  onRemoveUnit?: (productId: string) => void;
  onSetQty?: (product: Product, quantity: number) => void;
  onOpenZoom?: (product: Product) => void;
  onAddTen?: (product: Product) => void;
}

export function ProductCard({
  product,
  quantityInCart,
  onAddUnit,
  onRemoveUnit,
  onSetQty,
  onOpenZoom,
  onAddTen,
}: ProductCardProps) {
  const imageUrl = getCatalogImageUrl(product.imageFile);
  const showPrices = BRAND_CONFIG.wholesale.showPrices;
  const handleAdd = onAddUnit ?? onAddTen ?? (() => {});
  const handleRemove = onRemoveUnit ?? (() => {});

  return (
    <article className="product-card">
      <div
        className="product-card__media"
        style={{ backgroundColor: imageUrl ? product.pastelHex : '#FBE28A' }}
        onClick={() => onOpenZoom?.(product)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpenZoom?.(product);
          }
        }}
        aria-label={`Ver imagen completa de ${product.name}`}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="product-card__img"
            loading="lazy"
          />
        ) : (
          <UpcomingPlaceholder label="Próximamente" sublabel={product.name} />
        )}

        <div className="product-card__zoom-hint" title="Ver foto completa">
          <ZoomIn size={16} strokeWidth={2.4} />
        </div>

        {quantityInCart > 0 && (
          <span className="product-card__in-cart" aria-label={`${quantityInCart} unidades en pedido`}>
            {quantityInCart} u.
          </span>
        )}
      </div>

      <div className="product-card__body">
        <div className="product-card__info">
          <h3 className="product-card__title">{product.name}</h3>
          <div className="product-card__pricing">
            {showPrices ? (
              <>
                <span className="product-card__price">{formatCurrency(product.price)}</span>
                <span className="product-card__step">c/u · {product.code}</span>
              </>
            ) : (
              <span className="product-card__code-label">Código: {product.code}</span>
            )}
          </div>
        </div>

        <div className="product-card__action">
          {quantityInCart === 0 ? (
            <button
              type="button"
              className="product-card__add-btn"
              onClick={() => handleAdd(product)}
              aria-label={`Agregar ${product.name} al pedido`}
              title="Agregar al pedido"
            >
              <Plus size={16} strokeWidth={2.6} aria-hidden="true" />
              <span>Agregar</span>
            </button>
          ) : (
            <div className="product-card__stepper">
              <button
                type="button"
                className="product-card__stepper-btn"
                onClick={() => handleRemove(product.id)}
                aria-label={`Restar 1 unidad de ${product.name}`}
                title="Restar 1 unidad"
              >
                <Minus size={14} strokeWidth={2.6} />
              </button>

              <input
                type="number"
                min="0"
                className="product-card__stepper-input"
                value={quantityInCart}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  if (onSetQty) onSetQty(product, isNaN(val) ? 0 : val);
                }}
                aria-label={`Cantidad de ${product.name}`}
              />

              <button
                type="button"
                className="product-card__stepper-btn"
                onClick={() => handleAdd(product)}
                aria-label={`Sumar 1 unidad de ${product.name}`}
                title="Sumar 1 unidad"
              >
                <Plus size={14} strokeWidth={2.6} />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
