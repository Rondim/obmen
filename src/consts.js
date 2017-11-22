export const METALS = [
  { name: 'Au585', value: 'AU_585', content: 0.585, exchange: true, reception: true, orders: true },
  { name: 'Au583', value: 'AU_583', content: 0.583, exchange: true, reception: true, orders: false },
  { name: 'Au375', value: 'AU_375', content: 0.375, exchange: true, reception: true, orders: true },
  { name: 'Au750', value: 'AU_750', content: 0.750, exchange: true, reception: true, orders: false },
  { name: 'Au999.9', value: 'AU_9999', content: 0.9999, exchange: true, reception: true, orders: false },
  { name: 'Ag925', value: 'AG_925', content: 0,  exchange: false, reception: false, orders: true }
];

export const DISCOUNT_TYPES = {
  types: {
    'Ag': { name: 'Ag', value: 'Ag', discountRate: 0.12 },
    'Au': { name: 'Au', value: 'Au', discountRate: 0.15 },
    'Pt': { name: 'Pt', value: 'Pt', discountRate: 0.18 },
  },
  order: ['Ag', 'Au', 'Pt'],
  default: 'Ag'
};
