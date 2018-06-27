import calcData from '../calcData';
import { agOrders, auOrders, testScrapMetals } from './fixtures';

describe('calcData', () => {
  let emptyOutput = {
    exchangeDetails: {
      totalCost: 0,
      discount: 0,
      metalsCost: 0,
      toPay: 0,
      toIssue: 0
    },
    metalDetails: {
      metalsCost: 0,
      metalsWithCosts: []
    },
    invoiceDetails: {
      metalsCost: 0,
      invoiceMetals: []
    }
  }

  it('should work', () => {
    const data = {
      orders: [...agOrders, ...auOrders],
      scrapMetals: testScrapMetals,
      memberType: 'Ag',
      valid: true
    };

    const {
      metalsWithCosts,
      metalsCost,
      totalDiscount,
      invoiceMetals,
      dataForView
    } = calcData(data);

    const {
      exchangeDetails,
      metalDetails,
      invoiceDetails
    } = dataForView;
    
    expect(metalsWithCosts[0]['weight']).toBeCloseTo(2.282, 3);
    expect(metalsWithCosts[0]['gramCost']).toBeCloseTo(2090);
    expect(metalsCost).toBeCloseTo(6731, 0);
    expect(totalDiscount).toBeCloseTo(1080);
    expect(invoiceMetals[0]['cost']).toBeCloseTo(3750, 0);
    expect(invoiceMetals[1]['cost']).toBeCloseTo(2981, 0);
    expect(metalDetails.metalsWithCosts[0]['weight']).toBeCloseTo(2.282, 3);
  });
  it('should work if not valid', () => {
    const data = {
      orders: [...agOrders, ...auOrders],
      scrapMetals: testScrapMetals,
      memberType: 'Ag',
      valid: false
    };

    const {
      metalsWithCosts,
      metalsCost,
      totalDiscount,
      invoiceMetals,
      dataForView
    } = calcData(data);

    expect(dataForView).toEqual(emptyOutput);
  });
});