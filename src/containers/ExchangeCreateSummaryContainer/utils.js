import { AU_SHARES } from "../../consts";
import { getMetalObj } from '../../utils';
import { METAL_PRICES } from '../../consts';

export function getAuShare(probe) {
  if (!probe || !AU_SHARES[probe]) return 0;

  return AU_SHARES[probe];
}

const {
  METAL_MAX_PRICE,
  METAL_MED_PRICE,
  METAL_MIN_PRICE } = METAL_PRICES;

export function calcExchangeDetails(orders, metals, discPercent, valid) {
  let result = {
    exchangeDetails: {
      totalCost: 0,
      discount: 0,
      metalCost: 0,
      toPay: 0,
      toIssue: 0,
    },
    metalDetails: {
      metalCost: 0,
      maxPriceWeight: 0,
      maxPriceSum: 0,
      medPriceWeight: 0,
      medPriceSum: 0,
      minPriceWeight: 0,
      minPriceSum: 0
    },
    invoiceDetails: {
      items: [],
      metalCost: 0
    },
    isFormValid: false
  };

  if (!valid || !orders || !orders[0] || !orders[0].cost) {
    return result;
  }

  const { auWeight: auMetals } = calcMetals(metals);
  const { auWeight: auOrders, totalCost, auCost, agCost } = calcOrders(orders);


  const { metalDetails, ...exchangeDetails } = calcDetails({
    auMetals, auOrders, totalCost, auCost, agCost
  }, discPercent);

  const { metalCost } = metalDetails;

  const invoiceDetails = calcInvoiceDetails(metals, metalCost);

  return {
    exchangeDetails,
    metalDetails,
    invoiceDetails,
    isFormValid: true
  };
}

export function calcMetals(metals) {
  const totalPureAu = metals.reduce((totalAu, metal) => {
    const auShare = getMetalObj(metal.metal)['content'];
    return totalAu += metal.weight * auShare;
  }, 0);

  return { auWeight: pureTo585(totalPureAu) };
}

export function calcOrders(orders) {
  let
    auCost = 0,
    auWeight = 0,
    agCost = 0,
    totalCost = 0;

  orders.forEach(order => {
    let { weight, cost, metal } = order;
    weight = +weight;
    cost = +cost;

    const auContent = getMetalObj(metal)['content'];
    auWeight += pureTo585(auContent * weight);
    totalCost += cost;

    if (auContent > 0) {
      auCost += cost;
    } else {
      agCost += cost;
    }
  });

  return { auCost, auWeight, agCost, totalCost };
}

export function calcDetails(exchangeData, discPercent) {
  const { auMetals, auOrders, totalCost, agCost } = exchangeData;
  let
    discount = 0,
    toPay = 0,
    toIssue = 0,
    metalCost,
    maxPriceSum = 0,
    medPriceSum = 0,
    minPriceSum = 0,
    maxPriceWeight = 0,
    medPriceWeight = 0,
    minPriceWeight = 0;

  if (auMetals < auOrders) {
    discount = roundTo10(totalCost * discPercent);
    medPriceSum = Math.round(auMetals * METAL_MED_PRICE);
    medPriceWeight = auMetals;
  } else {
    maxPriceSum = Math.round(auOrders * METAL_MAX_PRICE);
    maxPriceWeight = auOrders;
    discount = roundTo10(agCost * discPercent);
    const discountedPrice = totalCost - discount;
    const leftMetals = auMetals - auOrders;
    const leftCost = discountedPrice - maxPriceSum;
    if (leftCost >= leftMetals * METAL_MED_PRICE) {
      medPriceSum = Math.round(leftMetals * METAL_MED_PRICE);
      medPriceWeight = leftMetals;
    } else {
      medPriceSum = leftCost;
      medPriceWeight = medPriceSum / METAL_MED_PRICE;
      minPriceWeight = auMetals - maxPriceWeight - medPriceWeight;
      minPriceSum = Math.round(minPriceWeight * METAL_MIN_PRICE);
    }
  }
  medPriceWeight = roundTo0_01(medPriceWeight);
  minPriceWeight = roundTo0_01(minPriceWeight);
  metalCost = roundTo10(maxPriceSum + medPriceSum + minPriceSum);
  const difference = totalCost - discount - metalCost;

  if (difference > 0) {
    toPay = difference
  } else if (difference < 0) {
    toIssue = -1 * difference;
  }

  return {
    totalCost,
    discount,
    metalCost,
    toPay,
    toIssue,
    metalDetails: {
      metalCost,
      maxPriceWeight,
      maxPriceSum,
      medPriceWeight,
      medPriceSum,
      minPriceWeight,
      minPriceSum
    }
  };
}

export function calcInvoiceDetails(metals, metalCost) {
  let currentCostSum = 0;
  const metalsLen = metals.length;

  const totalPureWeight = metals.reduce((sum, item) => {
    const pureWeight = getMetalObj(item.metal)['content'] * item.weight;
    return sum += pureWeight;
  }, 0);

  const avPureGramCost = metalCost / totalPureWeight;

  const items = metals.map((item, index) => {
    let cost, costPerGram;
    let { metal, weight } = item;
    if (index < metalsLen - 1) {
      cost = Math.round(
        getMetalObj(metal)['content'] * weight * avPureGramCost
      );
      currentCostSum += cost;
    } else {
      cost = metalCost - currentCostSum;
    }
    costPerGram = Math.round(cost / weight);
    weight = +weight;

    return {
      metal,
      weight,
      costPerGram,
      cost
    };
  });

  return {
    items,
    metalCost
  };
}
function pureTo585(pureWeight) {
  return Math.round((pureWeight / 0.585) * 100) / 100;
}

function roundTo10(number) {
  return Math.round(number / 10) * 10;
}
function roundTo0_01(number) {
  return Math.round(number * 100) / 100;
}