import { BRAND_CONFIG } from '@core/config/brand.config';
import { UpcomingPlaceholder, WhatsAppIcon } from '@shared/index';
import './EmptyCategoryState.css';

interface EmptyCategoryStateProps {
  categoryLabel: string;
}

export function EmptyCategoryState({ categoryLabel }: EmptyCategoryStateProps) {
  const quoteUrl = `${BRAND_CONFIG.whatsapp.baseUrl}?text=${encodeURIComponent(
    `¡Hola 3 Monos! Quiero consultar por modelos próximos a subir en ${categoryLabel}.`,
  )}`;

  return (
    <div className="empty-category" role="status">
      <div className="empty-category__thumb">
        <UpcomingPlaceholder label="Próximamente" sublabel={categoryLabel} />
      </div>

      <div className="empty-category__copy">
        <h3 className="empty-category__title font-display">Próximo a subir</h3>
        <p className="empty-category__text">
          Estamos preparando modelos de {categoryLabel.toLowerCase()}. Consultanos a medida por WhatsApp.
        </p>

        <a
          href={quoteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="empty-category__cta"
        >
          <WhatsAppIcon width={18} height={18} />
          <span>Consultar {categoryLabel}</span>
        </a>
      </div>
    </div>
  );
}
