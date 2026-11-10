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
    title: 'Mínimo 10 u. surtidas',
    description: 'Combiná modelos libremente de a 1 u. hasta sumar 10 u. o más en tu pedido mayorista.',
    pastelVar: 'var(--pastel-coral)',
    iconName: 'layers',
  },
  {
    id: 'produccion-medida',
    title: 'Cotizamos según tamaño',
    description: 'Cotizamos según el tamaño y ahí revisamos los colores disponibles.',
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
