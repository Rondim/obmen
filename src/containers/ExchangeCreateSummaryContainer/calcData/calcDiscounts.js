import fp from 'lodash/fp';
import { getAuShare } from '../utils';

export const calcNotAuDiscount = data => discounts => {
  const { orders, discountPercent } = data;

  const notAuOrders = orders.filter(({ probe }) => getAuShare(probe) === 0);
  const ordersCost = notAuOrders.reduce((s, { cost }) => s + cost, 0);

  const discount = {
    value: ordersCost * discountPercent,
    description: 'Скидка на Ag'
  };

  const nextDiscounts = [...discounts, discount].filter(({ value }) => value !== 0);
  return nextDiscounts;    
};

export const calcAuWeddingDiscount = data => discounts => {
  const { orders, discountPercent } = data;

  const auWeddingOrders = orders.filter(({ probe, isWedding }) => {
    return isWedding && getAuShare(probe) !== 0;
  });
  const ordersCost = auWeddingOrders.reduce((s, { cost }) => s + cost, 0);

  const discount = {
    value: ordersCost * discountPercent,
    description: 'Скидка на Au обручалки'
  };
  
  const nextDiscounts = [...discounts, discount].filter(({ value }) => value !== 0);
  return nextDiscounts;  
};

export const calcAuDiscount = data => discounts => {
  const { orders, discountPercent, metalsWeight585, criticalWeight585 } = data;

  const auOrders = orders.filter(({ probe, isWedding }) => {
    return !isWedding && getAuShare(probe) !== 0;
  });
  const ordersCost = auOrders.reduce((s, { cost }) => s + cost, 0);

  const ordersShareForDiscount = metalsWeight585 < criticalWeight585
    ? (criticalWeight585 - metalsWeight585) / criticalWeight585
    : 0
  ;

  const discount = {
    value: ordersCost * ordersShareForDiscount * discountPercent,
    description: 'Скидка на Au'
  };

  const nextDiscounts = [...discounts, discount].filter(({ value }) => value !== 0);
  return nextDiscounts;   
};


export default function calcDiscounts(data) {
  const {
    metalsWeight585,
    criticalWeight585,
    orders,
    discountPercent,
    startDiscounts = []
  } = data;

  const getDiscounts = fp.pipe([
    calcNotAuDiscount, calcAuWeddingDiscount, calcAuDiscount
  ].map(f => f(data)));

  const discounts = getDiscounts(startDiscounts);
  const totalDiscount = discounts.reduce((s, { value }) => s + value, 0);

  return { ...data, discounts, totalDiscount };
}
