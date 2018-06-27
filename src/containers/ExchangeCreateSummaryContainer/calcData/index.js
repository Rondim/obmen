import fp from 'lodash/fp';
import _ from 'lodash';
import { summerCompanyConfig, discountsForMembers, STONES_LOSSES } from '../../../consts'
import {
  set_scrapMetalsCleaned,
  set_metalsWeight585,
  set_criticalWeight585,
  set_ordersCost
} from './calcStartParams';
import calcDiscounts from './calcDiscounts';
import calcMetals from './calcMetals';
import calcInvoice from './calcInvoice';

export const set_ordersCostWithDiscount = data => {
  const { totalDiscount, ordersCost } = data;

  const ordersCostWithDiscount = ordersCost - totalDiscount;
  
  return { ...data, ordersCostWithDiscount };
}

export const set_dataForView = data => {
  let {
    ordersCost,
    totalDiscount,
    metalsCost,
    ordersCostWithDiscount,
    metalsWithCosts,
    invoiceMetals
  } = data;

  if (!ordersCost) {
    ordersCost = 0;
    totalDiscount = 0;
    metalsCost = 0;
    ordersCostWithDiscount = 0;
    metalsWithCosts = [];
    invoiceMetals = [];
  }
  const metalsCostRoundedBy10 = _.round(metalsCost, -1);
  const discountRoundedBy10 = _.round(totalDiscount);
  const toPay = ordersCost - metalsCostRoundedBy10 - discountRoundedBy10;

  const toPayRoundedBy10 = _.round(toPay, -1);
  const discountCorrected = discountRoundedBy10 + (toPay - toPayRoundedBy10);

  const { toPayForView, toIssueForView } = toPayRoundedBy10 >= 0
    ? { toPayForView: toPayRoundedBy10, toIssueForView: 0 }
    : { toPayForView: 0, toIssueForView: -toPayRoundedBy10 }
  ;

  const exchangeDetails = {
    totalCost: ordersCost,
    discount: discountCorrected,
    metalsCost: metalsCostRoundedBy10,
    toPay: toPayForView,
    toIssue: toIssueForView
  };

  const metalDetails = {
    metalsCost: metalsCostRoundedBy10,
    metalsWithCosts
  };

  const invoiceDetails = {
    metalsCost: metalsCostRoundedBy10,
    invoiceMetals
  };

  return {
    ...data,
    dataForView: {
      exchangeDetails, metalDetails, invoiceDetails
    } 
  };
}

const logData = data => {
  console.log(data);
  return data;
};

const prepare = (scrapMetals, orders) => {
  const scrapMetalsNew = ( scrapMetals ) 
    ? scrapMetals.map(({ probe, hasStones, weight }) => {
        return {
          probe,
          hasStones,
          weight: weight ? +weight : 0
        };
      })
    : []
  ;
  const ordersNew = orders
    ? orders.map(({ probe, isWedding, weight, cost }) => {
        return {
          probe,
          isWedding,
          weight: weight ? +weight : 0,
          cost: cost ? +cost : 0
        };
      })
    : []
  ;
  return {
    scrapMetalsNew,
    ordersNew
  };
}


export default function ({ scrapMetals, orders, memberType, valid }) {
  const { scrapMetalsNew, ordersNew } = prepare(scrapMetals, orders);
  const initialData = {
    scrapMetals: scrapMetalsNew,
    orders: ordersNew,
    config: summerCompanyConfig,
    discountPercent: discountsForMembers[memberType],
    stonesLosses: STONES_LOSSES
  };

  let operations;

  // console.log('orders', orders);
// || !orders || !orders[0] || !orders[0].cost
  if (!valid ) {
    operations = [set_dataForView];
  } else {
    operations = [
      set_scrapMetalsCleaned,
      set_metalsWeight585,
      set_criticalWeight585,
      set_ordersCost,
      calcDiscounts,
      set_ordersCostWithDiscount,
      calcMetals,
      calcInvoice,
      set_dataForView
    ];
  }

  const result = fp.pipe(operations)(initialData);

  return result;
}

