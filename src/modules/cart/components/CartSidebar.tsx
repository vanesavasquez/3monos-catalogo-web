import { useEffect } from 'react';
import { ShoppingBag, X } from 'lucide-react';
import { BRAND_CONFIG } from '@core/config/brand.config';
import { WhatsAppIcon, formatCurrency } from '@shared/index';
import { useCart } from '../context/CartContext';
import { buildWhatsappQuoteUrl } from '../services/whatsappQuote.service';
import { CartItemRow } from './CartItemRow';
import './CartSidebar.css';

export function CartSidebar() {
  const {
    items,
    isOpen,
    totalUnits,
    referenceSubtotal,
    canQuote,
    remainingForMin,
    closeCart,
    addUnit,
    removeUnit,
    setProductQuantity,
    removeItem,
    clearCart,
  } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeCart();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, closeCart]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const quoteUrl = buildWhatsappQuoteUrl(items);
  const showPrices = BRAND_CONFIG.wholesale.showPrices;

  return (
    <div
      className={`cart-drawer-root ${isOpen ? 'cart-drawer-root--open' : ''}`}
      aria-hidden={!isOpen}
    >
      <div className="cart-drawer__backdrop" onClick={closeCart} />

      <aside
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
      >
        <header className="cart-drawer__header">
          <div className="cart-drawer__title-group">
            <h2 id="cart-drawer-title" className="cart-drawer__title font-display">
              Tu Pedido
            </h2>
            <span className="cart-drawer__count">{totalUnits} u.</span>
          </div>

          <button
            type="button"
            className="cart-drawer__close"
            onClick={closeCart}
            aria-label="Cerrar carrito"
          >
            <X size={22} />
          </button>
        </header>

        <div className={`cart-drawer__notice ${canQuote ? 'cart-drawer__notice--success' : ''}`}>
          {items.length === 0
            ? `Compra mín. ${BRAND_CONFIG.wholesale.minTotalUnits} u. surtidas · Descuento mayorista en WhatsApp`
            : canQuote
              ? `¡Mínimo alcanzado (${totalUnits} u.)! Ya podés solicitar tu cotización.`
              : `Te faltan ${remainingForMin} ${remainingForMin === 1 ? 'unidad' : 'unidades'} para el mínimo mayorista (10 u. surtidas).`}
        </div>

        <div className="cart-drawer__body">
          {items.length === 0 ? (
            <div className="cart-drawer__empty">
              <div className="cart-drawer__empty-icon">
                <ShoppingBag size={30} strokeWidth={1.8} />
              </div>
              <p className="cart-drawer__empty-title font-display">Tu pedido está vacío</p>
              <p className="cart-drawer__empty-text">
                Tocá el botón Agregar en cualquier producto para sumar piezas a tu pedido (mínimo 10 u. surtidas en total).
              </p>
            </div>
          ) : (
            <ul className="cart-drawer__list">
              {items.map((item) => (
                <CartItemRow
                  key={item.product.id}
                  item={item}
                  onAdd={() => addUnit(item.product)}
                  onRemove={() => removeUnit(item.product.id)}
                  onChangeQty={(qty) => setProductQuantity(item.product, qty)}
                  onDelete={() => removeItem(item.product.id)}
                />
              ))}
            </ul>
          )}
        </div>

        <footer className="cart-drawer__footer">
          <div className="cart-drawer__summary">
            <div className="cart-drawer__row">
              <span>Total piezas</span>
              <strong>{totalUnits} unidades</strong>
            </div>
            {showPrices && (
              <div className="cart-drawer__row">
                <span>Ref. minorista</span>
                <strong>{formatCurrency(referenceSubtotal)}</strong>
              </div>
            )}
            <p className="cart-drawer__deposit">
              Seña para producir: {BRAND_CONFIG.wholesale.depositPercent}% ({BRAND_CONFIG.wholesale.paymentMethods})
            </p>
          </div>

          {items.length > 0 ? (
            <div className="cart-drawer__actions">
              {canQuote ? (
                <a
                  href={quoteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cart-drawer__quote-btn"
                >
                  <WhatsAppIcon width={20} height={20} />
                  <span>Cotizar</span>
                </a>
              ) : (
                <button
                  type="button"
                  className="cart-drawer__quote-btn cart-drawer__quote-btn--disabled"
                  disabled
                  title={`Agregá ${remainingForMin} u. más para alcanzar el mínimo`}
                >
                  <WhatsAppIcon width={20} height={20} />
                  <span>Faltan {remainingForMin} u. para cotizar</span>
                </button>
              )}

              <button
                type="button"
                className="cart-drawer__clear-btn"
                onClick={clearCart}
              >
                Vaciar lista
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="cart-drawer__quote-btn cart-drawer__quote-btn--disabled"
              disabled
            >
              <WhatsAppIcon width={20} height={20} />
              <span>Cotizar</span>
            </button>
          )}
        </footer>
      </aside>
    </div>
  );
}
