import calcDiscounts, { calcNotAuDiscount, calcAuWeddingDiscount, calcAuDiscount } from '../calcData/calcDiscounts';
import { auOrders, agOrders } from './fixtures';

describe('calcDiscount', () => {

  it('should work', () => {
    const data = {
      orders: [...auOrders, ...agOrders],
      discountPercent: 0.12,
      metalsWeight585: 1,
      criticalWeight585: 2.282
    };
    const { discounts, totalDiscount}  = calcDiscounts(data);
    
    expect(discounts[0]['value']).toBeCloseTo(360);
    expect(discounts[0]['description']).toBe('Скидка на Ag');
    expect(discounts[1]['value']).toBeCloseTo(720);
    expect(discounts[1]['description']).toBe('Скидка на Au обручалки');
    expect(discounts[2]['value']).toBeCloseTo(546, 0);
    expect(discounts[2]['description']).toBe('Скидка на Au');
    expect(totalDiscount).toBeCloseTo(1626, 0);
  });

  describe('calc functions', () => {
    describe('calcNotAuDiscount', () => {
      it('should work', () => {
        const data = {
          orders: [...auOrders, ...agOrders],
          discountPercent: 0.12
        };

        const result = calcNotAuDiscount(data)([]);
        
        expect(result[0]['value']).toBeCloseTo(360);
        expect(result[0]['description']).toBe('Скидка на Ag');
      });
    });
    describe('calcAuWeddingDiscount', () => {
      it('should work', () => {
        const data = {
          orders: [...auOrders, ...agOrders],
          discountPercent: 0.12
        };

        const result = calcAuWeddingDiscount(data)([]);
        
        expect(result[0]['value']).toBeCloseTo(720);
        expect(result[0]['description']).toBe('Скидка на Au обручалки');
      });
    });
    describe('calcAuDiscount', () => {
      it('should work with metalsWeight 585 < criticalWeight585', () => {
        const data = {
          orders: [...auOrders, ...agOrders],
          discountPercent: 0.12,
          metalsWeight585: 1,
          criticalWeight585: 2.282
        };

        const result = calcAuDiscount(data)([]);

        expect(result[0]['value']).toBeCloseTo(546, 0);
        expect(result[0]['description']).toBe('Скидка на Au');
      });
      it('should work with metalsWeight 585 >= criticalWeight585', () => {
        const data = {
          orders: [...auOrders, ...agOrders],
          discountPercent: 0.12,
          metalsWeight585: 3,
          criticalWeight585: 2.282
        };

        const result = calcAuDiscount(data)([]);

        expect(result).toEqual([]);
      });
    });
  });
})