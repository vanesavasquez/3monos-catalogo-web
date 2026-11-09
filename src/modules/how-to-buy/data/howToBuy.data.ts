export interface HowToBuyStep {
  id: string;
  title: string;
  description: string;
  pastelVar: string;
  iconName: 'layers' | 'sliders' | 'wallet';
}

export const HOW_TO_BUY_STEPS: HowToBuyStep[] = [
  {
    id: 'minimo-mayorista',
    title: 'Mínimo 10 unidades',
    description: 'Iniciás con 10 u. por modelo y luego sumás de a 1 u. Descuento mayorista al cotizar.',
    pastelVar: 'var(--pastel-coral)',
    iconName: 'layers',
  },
  {
    id: 'produccion-medida',
    title: 'A medida en 5–6 días',
    description: 'Coordinamos colores y tamaños disponibles por WhatsApp.',
    pastelVar: 'var(--pastel-cobalt)',
    iconName: 'sliders',
  },
  {
    id: 'sena-pago',
    title: '50% de seña',
    description: 'Transferencia o efectivo. El 50% restante contra entrega.',
    pastelVar: 'var(--pastel-mauve)',
    iconName: 'wallet',
  },
];
