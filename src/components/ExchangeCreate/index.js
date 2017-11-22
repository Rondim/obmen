import React from 'react';

import Orders from '../Orders';
import ScrapMetals from '../ScrapMetals';
import ExchangeInfo from '../ExchangeInfo';
import DCardChooser from '../DCardChooser';
import Invoice from '../Invoice';
import Header from './Header';
import ExchangeButton from './ExchangeButton';


const ExchangeCreate = ({ classes, handleSubmit, discountType, invoiceData,
  ordersWeight, scrapMetalsWeight, scrapMetals, exchangeData, hasErrors }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Header />
      <DCardChooser discountType={discountType} />
      <Orders totalWeight={ordersWeight} />
      <ScrapMetals totalWeight={scrapMetalsWeight} />
      <ExchangeInfo {...exchangeData} hasErrors={hasErrors}/>
      <Invoice
        invoiceData={invoiceData}
      />
      <ExchangeButton onClick={handleSubmit} />
    </form>
  );
}

export default ExchangeCreate;
