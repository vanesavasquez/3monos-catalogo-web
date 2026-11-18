import { useState } from 'react';
import { Plus, Minus, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const files = product.imageFiles?.length
    ? product.imageFiles
    : product.imageFile
      ? [product.imageFile]
      : [];
  const imageUrls = files
    .map((f) => getCatalogImageUrl(f))
    .filter((u): u is string => Boolean(u));
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const safeIndex = imageUrls.length > 0 ? currentImgIndex % imageUrls.length : 0;
  const imageUrl = imageUrls[safeIndex] ?? getCatalogImageUrl(product.imageFile);
  const hasMultipleImages = imageUrls.length > 1;
  const showPrices = BRAND_CONFIG.wholesale.showPrices;
  const handleAdd = onAddUnit ?? onAddTen ?? (() => {});
  const handleRemove = onRemoveUnit ?? (() => {});

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % imageUrls.length);
  };

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

        {hasMultipleImages && (
          <>
            <button
              type="button"
              className="product-card__nav-btn product-card__nav-btn--prev"
              onClick={handlePrevImage}
              onKeyDown={(e) => e.stopPropagation()}
              aria-label={`Foto anterior de ${product.name}`}
              title="Foto anterior"
            >
              <ChevronLeft size={16} strokeWidth={2.4} />
            </button>

            <button
              type="button"
              className="product-card__nav-btn product-card__nav-btn--next"
              onClick={handleNextImage}
              onKeyDown={(e) => e.stopPropagation()}
              aria-label={`Siguiente foto de ${product.name}`}
              title="Siguiente foto"
            >
              <ChevronRight size={16} strokeWidth={2.4} />
            </button>

            <div className="product-card__dots">
              {imageUrls.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`product-card__dot ${idx === safeIndex ? 'product-card__dot--active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImgIndex(idx);
                  }}
                  onKeyDown={(e) => e.stopPropagation()}
                  aria-label={`Ver foto ${idx + 1} de ${imageUrls.length}`}
                />
              ))}
            </div>
          </>
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
            {showPrices ? (
              <>
                <span className="product-card__price">{formatCurrency(product.price)}</span>
                <span className="product-card__step">c/u · {product.code}</span>
              </>
            ) : (
              <span className="product-card__code-label">Código: {product.code}</span>
            )}
          </div>
          {product.category === 'juegos' ? (
            product.description && <p className="product-card__desc">{product.description}</p>
          ) : (
            <span className="product-card__min-text">Mín. mayorista: 10 u. surtidas</span>
          )}
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
