import { 
  calcExchangeDetails, 
  calcOrders, 
  calcMetals, 
  calcDetails,
  calcInvoiceDetails } from '../utils';

const discPercent = 0.12;

describe('calcMetals', ()=> {
  test('works properly', ()=> {
    const metals = [
      {
        weight: '1.69',
        metal: 'AU_585'
      }, {
        weight: '2.04',
        metal: 'AU_375'
      }
    ];
    expect(calcMetals(metals)).toEqual({
      auWeight: 3.00
    });
  });
});
describe('calcOrders', ()=> {
  test('works properly with Au', () => {
    const orders = [
      {
        weight: '1.69',
        metal: 'AU_585',
        cost: '4000'
      }, {
        weight: '2.04',
        metal: 'AU_375',
        cost: '4500'
      }
    ];
    expect(calcOrders(orders)).toEqual({
      auCost: 8500,
      auWeight: 3.00,
      agCost: 0,
      totalCost: 8500
    });
  });
  test('works properly with Ag', () => {
    const orders = [
      {
        weight: '1.69',
        metal: 'AG_925',
        cost: '4000'
      },
      {
        weight: '1.69',
        metal: 'AU_585',
        cost: '5000'
      },
      {
        weight: '2.04',
        metal: 'AG_925',
        cost: '4500'
      }
    ];
    expect(calcOrders(orders)).toEqual({
      auCost: 5000,
      auWeight: 1.69,
      agCost: 8500,
      totalCost: 13500
    });
  });
  test('works properly with Au и Ag', () => {
    const orders = [
      {
        weight: '1.69',
        metal: 'AG_925',
        cost: '4000'
      }, {
        weight: '2.04',
        metal: 'AU_585',
        cost: '4500'
      }
    ];
    expect(calcOrders(orders)).toEqual({
      auCost: 4500,
      auWeight: 2.04,
      agCost: 4000,
      totalCost: 8500
    });
  });
});

describe('calcDetails', () => {
  test('works Au(metals) < Au(orders)', () => {
    const data = {
      auMetals: 1,
      auOrders: 2,
      totalCost: 8840,
      auCost: 5840,
      agCost: 3000
    };
    expect(calcDetails(data, discPercent)).toMatchObject({
      totalCost: 8840,
      discount: 1060,
      metalCost: 1550,
      toPay: 6230,
      toIssue: 0
    });
  });
  test('works Au(metals) > Au(orders) & tCost > mCost', () => {
    const data = {
      auMetals: 3,
      auOrders: 2,
      totalCost: 8840,
      auCost: 5840,
      agCost: 3000
    };
    expect(calcDetails(data, discPercent)).toMatchObject({
      totalCost: 8840,
      discount: 360,
      metalCost: 5450,
      toPay: 3030,
      toIssue: 0
    });
  });
  test('works Au(metals) > Au(orders) & tCost < mCost', () => {
    const data = {
      auMetals: 6,
      auOrders: 2,
      totalCost: 8840,
      auCost: 5840,
      agCost: 3000
    };
    expect(calcDetails(data, discPercent)).toMatchObject({
      totalCost: 8840,
      discount: 360,
      metalCost: 9890,
      toPay: 0,
      toIssue: 1410
    });
  });
});
describe('calcExchangeDetails', () => {
  test('=> 0 0 0 0 0 and isFormValid false if valid false', () => {
    const orders = [];
    const metals = [];
    const valid = false;
    expect(calcExchangeDetails(orders, metals, discPercent, valid)).toEqual({
      exchangeDetails: {
        totalCost: 0,
        discount: 0,
        metalCost: 0,
        toPay: 0,
        toIssue: 0,
      },
      metalDetails: {
        metalCost: 0,
        maxPriceWeight: 0,
        maxPriceSum: 0,
        medPriceWeight: 0,
        medPriceSum: 0,
        minPriceWeight: 0,
        minPriceSum: 0
      },
      invoiceDetails: {
        items: [],
        metalCost: 0
      },
      isFormValid: false
    })
  });
  test('=> 0 0 0 0 0 and isFormValid false if orders is falsy', () => {
    const orders = undefined;
    const metals = [];
    const valid = true;
    expect(calcExchangeDetails(orders, metals, discPercent, valid)).toEqual({
      exchangeDetails: {
        totalCost: 0,
        discount: 0,
        metalCost: 0,
        toPay: 0,
        toIssue: 0,
      },
      metalDetails: {
        metalCost: 0,
        maxPriceWeight: 0,
        maxPriceSum: 0,
        medPriceWeight: 0,
        medPriceSum: 0,
        minPriceWeight: 0,
        minPriceSum: 0
      },
      invoiceDetails: {
        items: [],
        metalCost: 0
      },
      isFormValid: false
    })
  });
  test('works', () => {
    const orders = [
      {
        weight: '1',
        metal: 'AU_585',
        cost: '4000'
      }
    ];
    const metals = [
      {
        weight: '2',
        metal: 'AU_585'
      }
    ];
    const valid = true;
    expect(calcExchangeDetails(orders, metals, discPercent, valid)).toMatchObject({
      exchangeDetails: {
        totalCost: 4000,
        discount: 0,
        metalCost: 3500,
        toPay: 500,
        toIssue: 0
      },
      metalDetails: {
        metalCost: 3500,
        maxPriceWeight: 1,
        maxPriceSum: 1950,
        medPriceWeight: 1,
        medPriceSum: 1550,
        minPriceWeight: 0,
        minPriceSum: 0
      },
      invoiceDetails: {
        items: [
          {
            metal: 'AU_585',
            weight: 2,
            costPerGram: 1750,
            cost: 3500
          }
        ],
        metalCost: 3500
      },
      isFormValid: true
    })
  });
});

describe('calcInvoiceDetails', () => {
  test('works', () => {
    const metals = [
      {
        weight: '1.63',
        metal: 'AU_585'
      }, {
        weight: '2.04',
        metal: 'AU_375'
      }, {
        weight: '1.77',
        metal: 'AU_500'
      }
    ];
    // 1.63 + 1.3077 + 1.5128 = 4.4505
    // 4.4505 * 1800 ~ 8010
    const metalCost = 8010;
    expect(calcInvoiceDetails(metals, metalCost)).toEqual({
      items: [
        {
          metal: 'AU_585',
          weight: 1.63,
          costPerGram: 1800,
          cost: 2934
        }, {
          metal: 'AU_375',
          weight: 2.04,
          costPerGram: 1154,
          cost: 2354
        }, {
          metal: 'AU_500',
          weight: 1.77,
          costPerGram: 1538,
          cost: 2722
        }
      ],
      metalCost: 8010
    });
     
  });
});