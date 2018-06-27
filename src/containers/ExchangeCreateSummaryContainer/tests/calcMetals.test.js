import calcMetals, { beforeCalc, afterCalc, initialCalc } from '../calcData/calcMetals';
import { summerCompanyConfig } from '../../../consts';

describe('calcMetals', () => {

  it('should work', () => {
    const data = {
      metalsWeight585: 10,
      criticalWeight585:4,
      ordersCostWithDiscount: 10000,
      config: summerCompanyConfig
    };
    const { metalsWithCosts, metalsCost } = calcMetals(data);
    expect(metalsWithCosts[0]['weight']).toBeCloseTo(4);
    expect(metalsWithCosts[0]['gramCost']).toBeCloseTo(2250);
    expect(metalsWithCosts[1]['weight']).toBeCloseTo(0.6667, 4);
    expect(metalsWithCosts[1]['gramCost']).toBeCloseTo(1500);
    expect(metalsWithCosts[2]['weight']).toBeCloseTo(5.3333, 4);
    expect(metalsWithCosts[2]['gramCost']).toBeCloseTo(1350);
    expect(metalsCost).toBeCloseTo(17200, 0);
  })

  describe('metal calc functions', () => {
    let data;
    beforeEach(() => {
      data = {
        config: summerCompanyConfig
      }
    });

    describe('beforeCalc', () => {
      it('should return [], when metalsWeight585 0', () => {
        const result = beforeCalc(data)([]);
        expect(result).toEqual([])
      });
      it('should work, when metalsWeight585 of 2 < criticalWeight585', () => {
        data = { ...data, metalsWeight585: 2, criticalWeight585: 3 };
        const result = beforeCalc(data)([]);
        expect(result).toEqual([{ 
          weight: 2, 
          gramCost: data.config.PRICE_BEFORE_0,
          cost: 2 * data.config.PRICE_BEFORE_0
         }])
      });
      it('should work, when metalsWeight585 of 4 > criticalWeight585', () => {
        data = { ...data, metalsWeight585: 4, criticalWeight585: 3 };
        const result = beforeCalc(data)([]);
        expect(result).toEqual([{ 
          weight: 3, 
          gramCost: data.config.PRICE_BEFORE_3,
          cost: 3 * data.config.PRICE_BEFORE_3
        }])
      });
      it('should work, when metalsWeight585 of 6 > criticalWeight585', () => {
        data = { ...data, metalsWeight585: 6, criticalWeight585: 3 };
        const result = beforeCalc(data)([]);
        expect(result).toEqual([{ 
          weight: 3, 
          gramCost: data.config.PRICE_BEFORE_5,
          cost: 3 * data.config.PRICE_BEFORE_5
        }])
      });
    });

    describe('afterCalc', () => {
      it('should return [], when metalsWeight585 0', () => {
        const result = afterCalc(data)([]);
        expect(result).toEqual([])
      });
      it('should calc, when criticalWeight585 = 0', () => {
        data = {...data, metalsWeight585: 3, ordersCostWithDiscount: 10000 };
        const result = afterCalc(data)([]);
        expect(result).toEqual([{ 
          weight: 3, 
          gramCost: data.config.PRICE_AFTER,
          cost: 3 * data.config.PRICE_AFTER
        }])
      });
      it('should calc, when metalsWeight585 < criticalWeight585' , () => {
        data = { ...data, metalsWeight585: 3, criticalWeight585: 4, ordersCostWithDiscount: 10000 };
        const beforeMetals = [{ weight: 3, gramCost: data.config.PRICE_BEFORE_3 }]
        const result = afterCalc(data)(beforeMetals);
        expect(result).toEqual([...beforeMetals])
      });
      it('should calc, when metalsWeight585 > criticalWeight585' , () => {
        data = { ...data, metalsWeight585: 6, criticalWeight585: 4, ordersCostWithDiscount: 16000 };
        const beforeMetals = [{ weight: 4, gramCost: data.config.PRICE_BEFORE_5 }]
        const result = afterCalc(data)(beforeMetals);
        expect(result).toEqual([
          ...beforeMetals, 
          { 
            weight: 2, 
            gramCost: data.config.PRICE_AFTER,
            cost: 2 * data.config.PRICE_AFTER
          }
        ]);
      });
      it('should calc, when metalsWeight585 > criticalWeight585 && metalsCost > ordersCost' , () => {
        data = { ...data, metalsWeight585: 10, criticalWeight585: 4, ordersCostWithDiscount: 10000 };
        const beforeMetals = [{ weight: 4, gramCost: data.config.PRICE_BEFORE_5 }]
        const leftToPay = data.ordersCostWithDiscount - beforeMetals[0].weight * beforeMetals[0].gramCost;
        const afterWeight = leftToPay / data.config.PRICE_AFTER;
        const purchaseWeight = data.metalsWeight585 - data.criticalWeight585 - afterWeight;
        const result = afterCalc(data)(beforeMetals);
        expect(result[0]).toEqual({...beforeMetals[0]});
        expect(result[1]['weight']).toBeCloseTo(afterWeight);
        expect(result[1]['gramCost']).toBeCloseTo(data.config.PRICE_AFTER);
        expect(result[2]['weight']).toBeCloseTo(purchaseWeight);
        expect(result[2]['gramCost']).toBeCloseTo(data.config.PRICE_PURCHASE);
      });
    });
  });
});