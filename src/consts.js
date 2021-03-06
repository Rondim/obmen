export const METALS = [
  { name: 'Au585', value: 'AU_585', content: 0.585, exchange: true, reception: true, orders: true },
  { name: 'Au583', value: 'AU_583', content: 0.583, exchange: true, reception: true, orders: false },
  { name: 'Au500', value: 'AU_500', content: 0.500, exchange: true, reception: true, orders: false },
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

export const EXCHANGE_COSTS = {
  highExPrice: 1950,
  lowExPrice: 1550, 
  metalCost: 1350
};

export const METAL_PRICES = {
  'purchase_1350': 1350,
  'exchange_1500': 1500,
  'exchange_1990': 1990,
  'exchange_2090': 2090,
  'exchange_2250': 2250
};

export const AU_SHARES = {
  'AU_585': 0.585,
  'AU_583': 0.583,
  'AU_500': 0.500,
  'AU_375': 0.375,
  'AU_750': 0.750,
  'AU_9999': 0.9999,
  'AU_900': 0.900,
  'AG_925': 0
}; 

export const summerCompanyConfig = {
  PRICE_BEFORE_0: METAL_PRICES['exchange_1990'],
  PRICE_BEFORE_3: METAL_PRICES['exchange_2090'],
  PRICE_BEFORE_5: METAL_PRICES['exchange_2250'],
  PRICE_AFTER: METAL_PRICES['exchange_1500'],
  PRICE_PURCHASE: METAL_PRICES['purchase_1350']
};

export const usualConfig = {
  PRICE_BEFORE: 2250,
  PRICE_AFTER: 1500,
  PRICE_PURCHASE: 1400
};

export const STONES_LOSSES = 0.07;

export const discountsForMembers = {
  'Ag': 0.12,
  'Au': 0.15,
  'Pt': 0.18
};