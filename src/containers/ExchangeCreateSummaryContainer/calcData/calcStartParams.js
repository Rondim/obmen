import { getAuShare }from '../utils';

export const set_scrapMetalsCleaned = data => {
  const { stonesLosses, scrapMetals } = data;

  const scrapMetalsCleaned = scrapMetals.map(({ weight, probe, hasStones }) => {
    const weightWithoutStones = ( hasStones )
      ? weight * (1 - stonesLosses)
      : weight
    ;
    return { weight: weightWithoutStones, probe };
  });

  return { ...data, scrapMetalsCleaned };
}

export const set_metalsWeight585 = data => {
  const { scrapMetalsCleaned } = data;

  const metalsWeight585 = scrapMetalsCleaned.reduce((s, { weight, probe }) => {
    return s + (getAuShare(probe) / 0.585) * weight;
  }, 0);

  return { ...data, metalsWeight585 };
}

export const set_criticalWeight585 = data => {
  const { orders } = data;

  const criticalWeight585 = orders.reduce((s, { weight, probe, isWedding }) => {
    const weightCounted585= ( isWedding )
      ? 0
      : (getAuShare(probe) / 0.585) * weight
    ;

    return s + weightCounted585;
  }, 0);

  return { ...data, criticalWeight585 };
}

export const set_ordersCost = data => {
  const { orders } = data;

  const ordersCost = orders.reduce((s, { cost }) => s + cost, 0);

  return { ...data, ordersCost };
}


