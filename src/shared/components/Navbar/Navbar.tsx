import { useEffect, useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { BRAND_CONFIG } from '@core/config/brand.config';
import { useCart } from '@modules/cart';
import './Navbar.css';

export function Navbar() {
  const { totalUnits, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <header className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <a href="#inicio" className="navbar__brand" aria-label="3 Monos — Inicio">
          <img
            src={
              isScrolled
                ? BRAND_CONFIG.logos.horizontalBlanco
                : BRAND_CONFIG.logos.horizontal
            }
            alt="3 Monos"
            className="navbar__logo"
          />
        </a>

        <nav className="navbar__nav" aria-label="Navegación principal">
          <a href="#catalogo" className="navbar__link">
            Catálogo
          </a>
          <a href="#como-comprar" className="navbar__link">
            Cómo comprar
          </a>
          <a href="#contacto" className="navbar__link">
            Contacto
          </a>
        </nav>

        <div className="navbar__actions">
          <button
            type="button"
            className="navbar__cart-btn"
            onClick={openCart}
            aria-label={`Abrir carrito con ${totalUnits} unidades seleccionadas`}
          >
            <ShoppingBag size={18} strokeWidth={2.2} />
            <span className="navbar__cart-label">Pedido</span>
            <span className="navbar__cart-badge">{totalUnits} u.</span>
          </button>

          <button
            type="button"
            className="navbar__burger"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="navbar__mobile-menu" aria-label="Navegación móvil">
          <a href="#catalogo" className="navbar__mobile-link" onClick={closeMobile}>
            Catálogo
          </a>
          <a href="#como-comprar" className="navbar__mobile-link" onClick={closeMobile}>
            Cómo comprar
          </a>
          <a href="#contacto" className="navbar__mobile-link" onClick={closeMobile}>
            Contacto
          </a>
        </nav>
      )}
    </header>
  );
}
