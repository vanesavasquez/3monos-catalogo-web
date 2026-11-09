import { Plus } from 'lucide-react';
import { UpcomingPlaceholder, formatCurrency } from '@shared/index';
import { BRAND_CONFIG } from '@core/config/brand.config';
import { getCatalogImageUrl } from '../data/imageLoader';
import type { Product } from '../types/catalog.types';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  quantityInCart: number;
  onAddTen: (product: Product) => void;
}

export function ProductCard({ product, quantityInCart, onAddTen }: ProductCardProps) {
  const imageUrl = getCatalogImageUrl(product.imageFile);
  const nextIncrement =
    quantityInCart === 0
      ? BRAND_CONFIG.wholesale.minOrderStep
      : BRAND_CONFIG.wholesale.unitStepAfterMin;

  return (
    <article className="product-card">
      <div
        className="product-card__media"
        style={{ backgroundColor: imageUrl ? product.pastelHex : '#FBE28A' }}
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
            <span className="product-card__price">{formatCurrency(product.price)}</span>
            <span className="product-card__step">
              c/u · +{nextIncrement} u.
            </span>
          </div>
        </div>

        <button
          type="button"
          className="product-card__add-btn"
          onClick={() => onAddTen(product)}
          aria-label={`Agregar ${nextIncrement} ${nextIncrement === 1 ? 'unidad' : 'unidades'} de ${product.name}`}
          title={`Agregar ${nextIncrement} ${nextIncrement === 1 ? 'unidad' : 'unidades'}`}
        >
          <Plus size={20} strokeWidth={2.6} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
