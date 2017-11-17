import { METALS } from '../../consts.js';

export function calcTotalWeight(metalList) {
  if (!metalList || !Array.isArray(metalList) || metalList.length === 0) {
    return 0;
  }
  let everyOrderHasWeight = true;
  let sum = 0;

  metalList.forEach(item => {
    if (!item.weight || !item.metal) everyOrderHasWeight = false;

    METALS.forEach(metal => {
      if (metal.value === item.metal) {
        sum += item.weight * metal.content / 0.585;
      }
    })
  })
  return everyOrderHasWeight ? (Math.round(sum*100)/100) : 0;
}

export function hasWeightErrors(errorList) {
  if (!errorList || !Array.isArray(errorList)
    || errorList.length === 0) return false;

  return errorList.some(order => !!order.weight);
}
