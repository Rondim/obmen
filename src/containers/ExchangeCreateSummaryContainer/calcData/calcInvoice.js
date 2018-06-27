import fp from 'lodash/fp';
import { getAuShare } from '../utils';

export const calcMetalData = dataForCalc => invoiceMetals => {
  const { weight, probe, metalsWeight585, metalsCost } = dataForCalc;
  
  const weight585 = (getAuShare(probe) / 0.585) * weight;
  const cost = (weight585 / metalsWeight585) * metalsCost; 
  const avgGramCost = cost / weight;

  return [
    ...invoiceMetals,
    { weight, probe, avgGramCost, cost }
  ];
}

export const setDataForCalcs = data => {
  const { scrapMetalsCleaned, metalsWeight585, metalsCost } = data;

  const dataForCalcs = scrapMetalsCleaned.map(({ probe, weight }) => {
    return { probe, weight, metalsWeight585, metalsCost };
  })

  return {
    ...data,
    dataForCalcs
  };
}

export default function calcInvoice(data) {
  const { 
    scrapMetalsCleaned,
    metalsCost,
    metalsWeight585 = 0,
    startInvoiceMetals = []
  } = data;

  if (metalsWeight585 === 0) return [];

  const { dataForCalcs } = fp.pipe([setDataForCalcs])(data);

  const invoiceMetals = fp.pipe(dataForCalcs.map(calcMetalData))(startInvoiceMetals);

  const output = { ...data, invoiceMetals };

  return output;
}




