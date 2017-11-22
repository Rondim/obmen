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

  return errorList.some(error => !!error.weight);
}

export function hasCostErrors(errorList) {
  if (!errorList || !Array.isArray(errorList)
    || errorList.length === 0) return false;

  return errorList.some(error => !!error.cost);
}

export function calcExchangeData(orders, scrapMetals, discountRate) {
  let discount = 0,
    exchanges = [],
    itemsCost = 0;
  const scrapMetalsWeight = calcTotalWeight(scrapMetals);
  const ordersWeight = calcTotalWeight(orders);

  itemsCost = orders.reduce((sum, order) =>  {
    sum += order.cost;
    return sum;
  }, 0);

  if (scrapMetalsWeight >= ordersWeight && ordersWeight !== 0) {
    // TODO вынести стоимость за грамм в отдельное место для конфигурации
    exchanges.push({ weight: ordersWeight, gCost: 1950 });
    exchanges.push({ weight: (scrapMetalsWeight - ordersWeight), gCost: 1550 });
  } else {
    discount = Math.round(discountRate * itemsCost / 10) * 10;
    exchanges.push({ weight: scrapMetalsWeight, gCost: 1550 });
  }

  return {
    discount,
    exchanges,
    itemsCost
  };
}

export function calcInvoiceData(orders, scrapMetals, discountRate) {
  const  { exchanges } = calcExchangeData(orders, scrapMetals, discountRate);
  const scrapMetalsCost = Math.round(exchanges.reduce((sum, { weight, gCost }) => {
    sum += weight * gCost;
    return sum;
  }, 0) / 10) * 10;
  const scrapMetalsWeight = scrapMetals.reduce((sum, { weight, metal }) => {
    sum += weight * getMetalContent(metal) / 0.585;
    return sum;
  }, 0)

  let invoiceData = scrapMetals.map(({ weight, metal }) => {
    const weightShare = (weight * getMetalContent(metal) / 0.585) / scrapMetalsWeight;
    const cost = Math.round(weightShare * scrapMetalsCost);
    const gramCost = Math.round(cost / weight);
    return {
      weight,
      metal,
      gramCost,
      cost
    };
  });

  const difference = invoiceData.reduce((diff, { cost }) => {
    return diff -= cost;
  }, scrapMetalsCost);

  invoiceData[invoiceData.length - 1]['cost'] = invoiceData[invoiceData.length -1 ]['cost'] + difference;

  return invoiceData;
}

export function getMetalContent(metal) {
  return METALS.filter(({ value }) => value === metal)[0]['content'];
}




export function strToNum(str) {
  let number = parseFloat(str);
  if (isNaN(number) || !isFinite(number)) return '';
  if (str.charAt(str.length - 1) === '.') {
    number = str
  }
  if (str.charAt(str.length - 1) === '0' && str.indexOf('.') !== -1) {
    number = str;
  }

  return number;
}
