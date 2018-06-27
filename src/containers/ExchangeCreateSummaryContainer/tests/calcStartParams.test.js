import { 
  set_scrapMetalsCleaned, 
  set_metalsWeight585,
  set_criticalWeight585,
  set_ordersCost } from '../calcData/calcStartParams';
import { testScrapMetals, agOrders, auOrders } from './fixtures';
import _ from 'lodash';

describe('start data calc funcs', () => {
  let scrapMetals, orders;
  beforeEach(() => {
    scrapMetals = _.cloneDeep(testScrapMetals);
    orders = _.cloneDeep([...agOrders, ...auOrders]);
  });
  it('set_scrapMetalsCleaned works', () => {
    const data = {
      scrapMetals,
      stonesLosses: 0.07
    };

    const result = set_scrapMetalsCleaned(data).scrapMetalsCleaned;

    expect(result[0]['weight']).toBeCloseTo(2);
    expect(result[0]['probe']).toBe('AU_585');
    expect(result[1]['weight']).toBeCloseTo(1.86);
    expect(result[1]['probe']).toBe('AU_500');
  });
  it('set_metalsWeight585 works', () => {
    const data = {
      scrapMetalsCleaned: scrapMetals.map(({ weight, probe }) => ({ weight, probe }))
    };

    const result = set_metalsWeight585(data).metalsWeight585;

    expect(result).toBeCloseTo(3.71);
  });
  it('set_criticalWeight585 works', () => {
    const data = { orders };

    const result = set_criticalWeight585(data).criticalWeight585;

    expect(result).toBeCloseTo(2.282, 3);
  });
  it('set_ordersCost works', () => {
    const data = { orders };

    const result = set_ordersCost(data).ordersCost;

    expect(result).toBeCloseTo(17100);
  });
});