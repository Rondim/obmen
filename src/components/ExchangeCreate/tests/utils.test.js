import { calcTotalWeight } from '../utils';
import { hasWeightErrors } from '../utils';

describe('calcTotalWeight', () => {
  test('returns 0 if orders is undefined', () => {
    expect(calcTotalWeight(undefined)).toEqual(0);
  });
  test('returns 0 if orders is empty array', () => {
    expect(calcTotalWeight([])).toEqual(0);
  });
  test('calcs as 0 if no weight in order object', () => {
    const orders1 = [
      { cost: 4000 },
      { weight: 1.37, cost: 3000 }
    ];
    const orders2 = [
      { cost: 4000 },
      { cost: 5352 }
    ];
    expect(calcTotalWeight(orders1)).toEqual(0);
    expect(calcTotalWeight(orders2)).toEqual(0);
  });
  test('returns sum of orders with different metals', () => {
    const orders = [
      { weight: 1.37, cost: 4000, metal: 'AU_585' },
      { weight: 5.68, cost: 5352, metal: 'AU_375' },
      { weight: 1.74, cost: 6000, metal: 'AU_9999' }
    ];
    expect(calcTotalWeight(orders)).toEqual(7.99);
  });
});

describe('hasWeightErrors', () => {
  test('should return false if errors is undefined', () => {
    expect(hasWeightErrors(undefined)).toEqual(false);
  });
  test('should return false if errors is {}', () => {
    expect(hasWeightErrors({})).toEqual(false);
  });
  test('should return false if errors in orders is empty', () => {
    expect(hasWeightErrors({ orders: [] })).toEqual(false);
  });
  test('should return false if no weight errors in orders', () => {
    expect(hasWeightErrors({ orders: [{ cost: 'Ошибка' }] })).toEqual(false);
  });
  test('should return true if has weight errors in orders', () => {
    const errors1 = {
      orders: [
        { weight: 'Ошибка' },
        { cost: 'Ошибка ' }
      ]
    };
    const errors2 = {
      orders: [
        { weight: 'Ошибка' },
        { weight: 'Ошибка ' }
      ]
    };
    const errors3 = {
      orders: [
        { cost: 'Ошибка' },
        { cost: 'Ошибка ' }
      ]
    };
    expect(hasWeightErrors(errors1)).toEqual(true);
    expect(hasWeightErrors(errors2)).toEqual(true);
    expect(hasWeightErrors(errors3)).toEqual(false);
  });
});
