import { METALS } from './consts.js';

export function calcTotalWeight(orders) {
  if (!orders || !Array.isArray(orders) || orders.length === 0) {
    return 0;
  }
  let everyOrderHasWeight = true;
  let sum = 0;

  orders.forEach(order => {
    if (!order.weight || !order.metal) everyOrderHasWeight = false;

    METALS.forEach(metal => {
      if (metal.value === order.metal) {
        sum += order.weight * metal.content / 0.585;
      }
    })
  })
  return everyOrderHasWeight ? (Math.round(sum*100)/100) : 0;
}

export function hasWeightErrors(errors) {
  if ( !errors || !errors.orders || !Array.isArray(errors.orders)
    || errors.orders.length === 0) return false;

  return errors.orders.some(order => !!order.weight);
}
