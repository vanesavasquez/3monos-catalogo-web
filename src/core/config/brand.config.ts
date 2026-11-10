export const BRAND_CONFIG = {
  name: '3 Monos',
  slogan: 'Diseño e impresiones 3D.',
  location: 'San Luis Capital, Argentina',
  logos: {
    horizontal: '/logos/horizontal.png',
    horizontalBlanco: '/logos/horizontal_Blanco.png',
    cuadrado: '/logos/cuadrado.png',
    cuadradoColor: '/logos/cuadrado _ color.png',
    cuadradoIcono: '/logos/cuadrado N_icono.png',
    iconoColor: '/logos/Icono _ Color.png',
    iconoNegativo: '/logos/Icono Negativo.png',
  },
  whatsapp: {
    phone: '5492664214124',
    display: '+54 9 266 421-4124',
    baseUrl: 'https://wa.me/5492664214124',
  },
  instagram: {
    handle: '@3monos.3d',
    url: 'https://instagram.com/3monos.3d',
  },
  wholesale: {
    minTotalUnits: 10,
    minOrderStep: 10,
    unitStep: 1,
    showPrices: false,
    depositPercent: 50,
    productionDays: '5 a 6 días',
    paymentMethods: 'Transferencia o efectivo',
  },
} as const;
