import { hasOrdersErrors, hasMetalsErrors, calcOrdersSum, calcMetalsSum } from '../utils';

let errors;

beforeEach(() => {
  errors = {};
});

describe('calcOrdersSum', () => {
  test('return 0 0 if has errors', () => {
    errors.orders = {};
    const orders = [{
      weight: 1.69,
      metal: 'sdfsdf',
      cost: 2390
    }];
    expect(calcOrdersSum(orders, errors)).toEqual({
      totalWeight: 0,
      totalCost: 0,
      hasErrors: true
    });
  });
  test('sums orders with 375 and 585', () => {
    const orders = [
      {
        weight: 1.69,
        metal: 'AU_585',
        cost: 4000
      },{
        weight: 2.04,
        metal: 'AU_375',
        cost: 4500
      }
    ];
    expect(calcOrdersSum(orders, errors)).toEqual({
      totalWeight: 3.00,
      totalCost: 8500,
      hasErrors: false
    });
  });
  test('sums orders with 585 and Ag', () => {
    const orders = [
      {
        weight: 10.93,
        metal: 'AG_925',
        cost: 4000
      }, {
        weight: 2.04,
        metal: 'AU_585',
        cost: 4500
      }
    ];
    expect(calcOrdersSum(orders, errors)).toEqual({
      totalWeight: 2.04,
      totalCost: 8500,
      hasErrors: false
    });
  });
  test('sums orders with only Ag', () => {
    const orders = [
      {
        weight: 10.93,
        metal: 'AG_925',
        cost: 4000
      }, {
        weight: 2.04,
        metal: 'AG_925',
        cost: 4500
      }
    ];
    expect(calcOrdersSum(orders, errors)).toEqual({
      totalWeight: 0,
      totalCost: 8500,
      hasErrors: false
    });
  });
});

describe('calcMetalsSum', () => {
  test('return 0 if has errors', () => {
    errors.metals = {};
    const metals = [{
      weight: 1.69,
      metal: 'sdfsdf'
    }];
    expect(calcMetalsSum(metals, errors)).toEqual({
      totalWeight: 0,
      hasErrors: true
    });
  });
  test('sums metals with 375 and 585', () => {
    const metals = [
      {
        weight: 1.69,
        metal: 'AU_585'
      }, {
        weight: 2.04,
        metal: 'AU_375'
      }
    ];
    expect(calcMetalsSum(metals, errors)).toEqual({
      totalWeight: 3.00,
      hasErrors: false
    });
  });
});