import './UpcomingPlaceholder.css';

interface UpcomingPlaceholderProps {
  label?: string;
  sublabel?: string;
  compact?: boolean;
}

export function UpcomingPlaceholder({
  label = 'Próximamente',
  sublabel = 'Foto próxima a subir',
  compact = false,
}: UpcomingPlaceholderProps) {
  return (
    <div
      className={`upcoming-placeholder ${compact ? 'upcoming-placeholder--compact' : ''}`}
      role="img"
      aria-label={`${label} — ${sublabel}`}
    >
      <svg
        className="upcoming-placeholder__cube"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M24 5L41 14.8V33.2L24 43L7 33.2V14.8L24 5Z" />
        <path d="M24 24L41 14.8" />
        <path d="M24 24L7 14.8" />
        <path d="M24 24V43" />
      </svg>
      {!compact && (
        <>
          <span className="upcoming-placeholder__label font-display">{label}</span>
          {sublabel && <span className="upcoming-placeholder__sublabel">{sublabel}</span>}
        </>
      )}
    </div>
  );
}
