import { getMetalObj } from '../../utils';

export function calcOrdersSum(orders, errors) {
  let totalWeight = 0;
  let totalCost = 0;

  const hasErrors = !errors || errors.orders !== undefined;
  // Если есть ошибки то вернуть 0 0 
  if (hasErrors || !orders) {
    return { totalWeight, totalCost, hasErrors };
  }

  // Суммируем стоимость и металлы в пересчете в 585 до 2 значащих цифр
  orders.forEach(order => {
    const metalShare = getMetalObj(order.probe)['content'];
    const auContentIn585 = order.weight * (metalShare / 0.585);
    
    totalWeight += auContentIn585;
    totalCost += +order.cost;
  });

  totalWeight = (Math.round(totalWeight * 100)) / 100;

  return { totalWeight, totalCost, hasErrors };
}

export function calcMetalsSum(metals, errors) {
  let totalWeight = 0;
  const hasErrors = !errors || errors.metals !== undefined;
  if (hasErrors || !metals) {
    return { totalWeight, hasErrors };
  }

  // Суммируем металлы в пересчете в 585 до 2 значащих цифр
  metals.forEach(({ probe, weight, hasStones }) => {
    const metalShare = getMetalObj(probe)['content'];
    const k = hasStones ? 0.93 : 1;
    const auContentIn585 = k * weight * (metalShare / 0.585);
    totalWeight += auContentIn585;
  });

  totalWeight = Math.round(totalWeight * 100) / 100;

  return { totalWeight, hasErrors };
}



