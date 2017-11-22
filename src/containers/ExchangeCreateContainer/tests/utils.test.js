import { calcTotalWeight } from '../utils';
import { hasWeightErrors } from '../utils';
import { getMetalContent } from '../utils';
import { calcInvoiceData } from '../utils';

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
  test('should return false if errorList is undefined', () => {
    expect(hasWeightErrors(undefined)).toEqual(false);
  });
  test('should return false if errorList is empty', () => {
    expect(hasWeightErrors([])).toEqual(false);
  });
  test('should return false if no weight errorList', () => {
    expect(hasWeightErrors([{ cost: 'Ошибка' }])).toEqual(false);
  });
  test('should return true if has weight errors in orders', () => {
    const errors1 = [
      { weight: 'Ошибка' },
      { cost: 'Ошибка ' }
    ];
    const errors2 = [
      { weight: 'Ошибка' },
      { weight: 'Ошибка ' }
    ];
    const errors3 = [
      { cost: 'Ошибка' },
      { cost: 'Ошибка ' }
    ];
    expect(hasWeightErrors(errors1)).toEqual(true);
    expect(hasWeightErrors(errors2)).toEqual(true);
    expect(hasWeightErrors(errors3)).toEqual(false);
  });
});

describe('getMetalContent', () => {
  test('return proper contents', () => {
    expect(getMetalContent('AU_585')).toEqual(0.585);
    expect(getMetalContent('AU_375')).toEqual(0.375);
  });
});

describe('calcInvoiceData', () => {
  test('proper output', () => {
    const orders = [
      { weight: 1.37, cost: 4000, metal: 'AU_585' },
      { weight: 5.68, cost: 5352, metal: 'AU_375' }
    ];
    const scrapMetals = [
      { weight: 1.75, metal: 'AU_585' },
      { weight: 3, metal: 'AU_375' }
    ];

    const result = calcInvoiceData(orders, scrapMetals, 0.12);

    console.log(result);
    expect(result.length).toEqual(2);
  });
});
