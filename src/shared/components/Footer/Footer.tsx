import { MapPin } from 'lucide-react';
import { BRAND_CONFIG } from '@core/config/brand.config';
import { InstagramIcon, WhatsAppIcon } from '@shared/components/Icons/BrandIcons';
import './Footer.css';

export function Footer() {
  const directWhatsappUrl = `${BRAND_CONFIG.whatsapp.baseUrl}?text=${encodeURIComponent(
    '¡Hola 3 Monos! Quiero consultar por pedidos mayoristas.',
  )}`;

  return (
    <footer id="contacto" className="footer">
      <div className="container">
        <div className="footer__panel">
          <div className="footer__brand-block">
            <img
              src={BRAND_CONFIG.logos.horizontalBlanco}
              alt="3 Monos"
              className="footer__logo"
            />
            <div className="footer__identity">
              <p className="footer__slogan">{BRAND_CONFIG.slogan}</p>
              <p className="footer__location">
                <MapPin size={17} strokeWidth={2.1} aria-hidden="true" />
                <span>{BRAND_CONFIG.location}</span>
              </p>
            </div>
          </div>

          <div className="footer__contacts">
            <a
              href={directWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__contact-btn footer__contact-btn--primary"
            >
              <WhatsAppIcon width={20} height={20} />
              <span>WhatsApp Business</span>
            </a>

            <a
              href={BRAND_CONFIG.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__contact-btn footer__contact-btn--outline"
            >
              <InstagramIcon width={20} height={20} />
              <span>Instagram</span>
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} 3 Monos · Impresión 3D</span>
          <span>Mayorista mín. 10 u. · Seña 50%</span>
        </div>
      </div>
    </footer>
  );
}
