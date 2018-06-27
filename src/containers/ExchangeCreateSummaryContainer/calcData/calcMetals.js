import fp from 'lodash/fp';

export const beforeCalc = data => metals => {
  const { 
    metalsWeight585 = 0,
    criticalWeight585 = 0,
    ordersCostWithDiscount = 0,
    config: {
      PRICE_BEFORE_0,
      PRICE_BEFORE_3,
      PRICE_BEFORE_5
    }
  } = data;

  if (metalsWeight585 === 0 || criticalWeight585 === 0) return [];

  const gramCost = ( metalsWeight585 < 3 )
    ? PRICE_BEFORE_0
    : ( metalsWeight585 < 5 )
      ? PRICE_BEFORE_3
      : PRICE_BEFORE_5
  ;

  const beforeWeight = metalsWeight585 < criticalWeight585
    ? metalsWeight585
    : criticalWeight585
  ;

  const cost = beforeWeight * gramCost;

  return [...metals, { weight: beforeWeight, gramCost, cost }];
}

export const afterCalc = data => metals => {
  const {
    metalsWeight585 = 0,
    criticalWeight585 = 0,
    ordersCostWithDiscount = 0,
    config: {
      PRICE_BEFORE_0,
      PRICE_BEFORE_3,
      PRICE_BEFORE_5,
      PRICE_AFTER,
      PRICE_PURCHASE
    }
  } = data;

  let afterMetals = [];

  if (metalsWeight585 === 0) return [];

  const excessWeight585 = ( metalsWeight585 > criticalWeight585 )
    ? metalsWeight585 - criticalWeight585
    : 0
  ;

  if (excessWeight585 !== 0) {
    const beforeMetalsCost = metals.reduce((sum, { weight, gramCost }) => sum + weight * gramCost, 0);
    const leftToPay = ordersCostWithDiscount - beforeMetalsCost;
    const leftToPayByMetal = leftToPay / PRICE_AFTER;

    const { afterWeight, purchaseWeight } = excessWeight585 <= leftToPayByMetal
      ? { afterWeight: excessWeight585, purchaseWeight: 0 }
      : { afterWeight: leftToPayByMetal, purchaseWeight: excessWeight585 - leftToPayByMetal }
    ;

    afterMetals = [
      { weight: afterWeight, gramCost: PRICE_AFTER, cost: afterWeight * PRICE_AFTER },
      { weight: purchaseWeight, gramCost: PRICE_PURCHASE, cost: purchaseWeight * PRICE_PURCHASE }
    ];
    afterMetals = afterMetals.filter(metal => metal.weight !== 0);
  }

  return [...metals, ...afterMetals];
}

export default function calcMetals(data) {
  const {
    criticalWeight585,
    metalsWeight585,
    ordersCostWithDiscount,
    startMetals = [],
    config
  } = data;

  const getMetals = fp.pipe([beforeCalc, afterCalc].map(f => f(data)));
  const metalsWithCosts = getMetals(startMetals);
  const metalsCost = metalsWithCosts.reduce((s, { cost }) => s + cost, 0);

  return { ...data, metalsWithCosts, metalsCost };
}



