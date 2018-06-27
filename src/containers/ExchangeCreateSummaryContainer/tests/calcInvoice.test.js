import calcInvoice, { calcMetalData, setDataForCalcs } from '../calcData/calcInvoice';

describe('calcInvoice', () => {

  it('should work', () => {
    const data = {
      metalsCost: 8000,
      metalsWeight585: 3.7094,
      scrapMetalsCleaned: [
        { weight: 2, probe: 'AU_585' },
        { weight: 2, probe: 'AU_500' }
      ]
    };
    const result = calcInvoice(data).invoiceMetals;

    expect(result[0]['weight']).toBeCloseTo(2);
    expect(result[0]['probe']).toBe('AU_585');
    expect(result[0]['avgGramCost']).toBeCloseTo(2156.683, 3)
    expect(result[0]['cost']).toBeCloseTo(4313.366, 3)
    expect(result[1]['probe']).toBe('AU_500');
    expect(result[1]['avgGramCost']).toBeCloseTo(1843.319, 3)
    expect(result[1]['cost']).toBeCloseTo(3686.638, 3)
  });

  describe('calcMetalData', () => {
    let data;
    beforeEach(() => {
      data = {
        weight: 2.06,
        probe: 'AU_585',
        metalsWeight585: 8.32,
        metalsCost: 16000
      };
    });
    it('should work with probe 585', () => {
      const result = calcMetalData(data)([]);

      expect(result[0]['weight']).toBeCloseTo(2.06);
      expect(result[0]['probe']).toBe('AU_585');
      expect(result[0]['avgGramCost']).toBeCloseTo(1923.08);
      expect(result[0]['cost']).toBeCloseTo(3961.54);
    })
    it('should work with probe 500', () => {
      data.probe = 'AU_500';
      const result = calcMetalData(data)([]);

      expect(result[0]['weight']).toBeCloseTo(2.06);
      expect(result[0]['probe']).toBe('AU_500');
      expect(result[0]['avgGramCost']).toBeCloseTo(1643.66);
      expect(result[0]['cost']).toBeCloseTo(3385.93);
    })
  });

  describe('setDataForCalcs', () => {
    const data = {
      metalsCost: 10000,
      metalsWeight585: 3.71,
      scrapMetalsCleaned: [
        { weight: 2, probe: 'AU_585' },
        { weight: 2, probe: 'AU_500' }
      ]
    };
    const result = setDataForCalcs(data);
    
    expect(result.metalsCost).toBeCloseTo(10000);
    expect(result.metalsWeight585).toBeCloseTo(3.71);
    expect(result.scrapMetals).toEqual(data.scrapMetals);
    expect(result.dataForCalcs[0]['probe']).toBe('AU_585');
    expect(result.dataForCalcs[0]['metalsWeight585']).toBeCloseTo(3.71);
    expect(result.dataForCalcs[0]['metalsCost']).toBeCloseTo(10000);
    expect(result.dataForCalcs[1]['probe']).toBe('AU_500');
  });
});