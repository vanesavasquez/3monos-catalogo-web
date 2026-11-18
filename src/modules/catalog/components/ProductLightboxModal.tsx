import { useEffect, useState } from 'react';
import { X, Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';
import { UpcomingPlaceholder } from '@shared/index';
import { getCatalogImageUrl } from '../data/imageLoader';
import type { Product } from '../types/catalog.types';
import './ProductLightboxModal.css';

interface ProductLightboxModalProps {
  product: Product | null;
  quantityInCart: number;
  isOpen: boolean;
  onClose: () => void;
  onAddUnit: (product: Product) => void;
  onRemoveUnit: (productId: string) => void;
  onSetQty?: (product: Product, quantity: number) => void;
}

export function ProductLightboxModal({
  product,
  quantityInCart,
  isOpen,
  onClose,
  onAddUnit,
  onRemoveUnit,
  onSetQty,
}: ProductLightboxModalProps) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const files = product?.imageFiles?.length
    ? product.imageFiles
    : product?.imageFile
      ? [product.imageFile]
      : [];
  const imageUrls = files
    .map((f) => getCatalogImageUrl(f))
    .filter((u): u is string => Boolean(u));

  useEffect(() => {
    setCurrentImgIndex(0);
  }, [product?.id, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && imageUrls.length > 1) {
        setCurrentImgIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);
      } else if (e.key === 'ArrowRight' && imageUrls.length > 1) {
        setCurrentImgIndex((prev) => (prev + 1) % imageUrls.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, imageUrls.length]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const safeIndex = imageUrls.length > 0 ? currentImgIndex % imageUrls.length : 0;
  const imageUrl = imageUrls[safeIndex] ?? getCatalogImageUrl(product.imageFile);
  const hasMultipleImages = imageUrls.length > 1;

  return (
    <div
      className="lightbox-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Vista ampliada de ${product.name}`}
    >
      <div className="lightbox-card" onClick={(e) => e.stopPropagation()}>
        <div
          className="lightbox-card__media"
          style={{ backgroundColor: imageUrl ? product.pastelHex : '#FBE28A' }}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
              className="lightbox-card__img"
            />
          ) : (
            <UpcomingPlaceholder label="Próximamente" sublabel={product.name} />
          )}

          {hasMultipleImages && (
            <>
              <button
                type="button"
                className="lightbox-card__nav-btn lightbox-card__nav-btn--prev"
                onClick={() =>
                  setCurrentImgIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length)
                }
                aria-label={`Foto anterior de ${product.name}`}
                title="Foto anterior"
              >
                <ChevronLeft size={20} strokeWidth={2.4} />
              </button>

              <button
                type="button"
                className="lightbox-card__nav-btn lightbox-card__nav-btn--next"
                onClick={() => setCurrentImgIndex((prev) => (prev + 1) % imageUrls.length)}
                aria-label={`Siguiente foto de ${product.name}`}
                title="Siguiente foto"
              >
                <ChevronRight size={20} strokeWidth={2.4} />
              </button>

              <div className="lightbox-card__dots">
                {imageUrls.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`lightbox-card__dot ${idx === safeIndex ? 'lightbox-card__dot--active' : ''}`}
                    onClick={() => setCurrentImgIndex(idx)}
                    aria-label={`Ver foto ${idx + 1} de ${imageUrls.length}`}
                  />
                ))}
              </div>
            </>
          )}

          <div className="lightbox-card__badges">
            <span className="lightbox-card__badge-code">
              {product.code} · {product.category.toUpperCase()}
            </span>
            {quantityInCart > 0 && (
              <span className="lightbox-card__badge-cart">
                {quantityInCart} u. en pedido
              </span>
            )}
          </div>

          <button
            type="button"
            className="lightbox-card__close"
            onClick={onClose}
            aria-label="Cerrar vista previa"
            title="Cerrar vista previa (Esc)"
          >
            <X size={22} strokeWidth={2.4} />
          </button>
        </div>

        <div className="lightbox-card__footer">
          <div className="lightbox-card__info">
            <h3 className="lightbox-card__title font-display">{product.name}</h3>
            {product.category === 'juegos' ? (
              product.description && (
                <span className="lightbox-card__desc">{product.description}</span>
              )
            ) : (
              <span className="lightbox-card__desc">
                Mínimo mayorista: 10 u. surtidas en toda la web
              </span>
            )}
          </div>

          <div className="lightbox-card__action">
            {quantityInCart === 0 ? (
              <button
                type="button"
                className="lightbox-card__add-btn"
                onClick={() => onAddUnit(product)}
              >
                <Plus size={18} strokeWidth={2.4} />
                <span>Agregar</span>
              </button>
            ) : (
              <div className="lightbox-card__stepper">
                <button
                  type="button"
                  className="lightbox-card__stepper-btn"
                  onClick={() => onRemoveUnit(product.id)}
                  aria-label={`Restar 1 unidad de ${product.name}`}
                  title="Restar 1 unidad"
                >
                  <Minus size={16} strokeWidth={2.5} />
                </button>

                <input
                  type="number"
                  min="0"
                  className="lightbox-card__stepper-input"
                  value={quantityInCart}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    if (onSetQty) {
                      onSetQty(product, isNaN(val) ? 0 : val);
                    }
                  }}
                  aria-label={`Cantidad de ${product.name}`}
                />

                <button
                  type="button"
                  className="lightbox-card__stepper-btn"
                  onClick={() => onAddUnit(product)}
                  aria-label={`Sumar 1 unidad de ${product.name}`}
                  title="Sumar 1 unidad"
                >
                  <Plus size={16} strokeWidth={2.5} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
