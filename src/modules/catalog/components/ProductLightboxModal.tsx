import { useEffect } from 'react';
import { X, Plus, Minus } from 'lucide-react';
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
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

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

  const imageUrl = getCatalogImageUrl(product.imageFile);

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
            <span className="lightbox-card__desc">
              Mínimo mayorista: 10 u. surtidas en toda la web
            </span>
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
