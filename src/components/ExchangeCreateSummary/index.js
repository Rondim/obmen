import React from 'react';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';

import ExchangeDetails from './ExchangeDetails';
import MetalDetails from './MetalDetails';
import InvoiceDetails from './InvoiceDetails';


const ExchangeCreateSummary = ({ 
  exchangeDetailsData, metalDetailsData, invoiceDetailsData }) => {
  return (
    <Row>
      <Col xs="6">
        <ExchangeDetails {...exchangeDetailsData} />
      </Col>
      <Col xs="6">
        <MetalDetails {...metalDetailsData} />
      </Col>
      <Col xs="12">
        <InvoiceDetails {...invoiceDetailsData} />
      </Col>
    </Row>
  );
};

ExchangeCreateSummary.propTypes = {
  exchangeDetailsData: PropTypes.shape({
    totalCost: PropTypes.number,
    discount: PropTypes.number,
    metalCost: PropTypes.number,
    toPay: PropTypes.number,
    toIssue: PropTypes.number,
    isFormValid: PropTypes.bool
  }),
  metalDetailsData: PropTypes.shape({
    metalCost: PropTypes.number,
    maxPriceWeight: PropTypes.number,
    maxPriceSum: PropTypes.number,
    medPriceWeight: PropTypes.number,
    medPriceSum: PropTypes.number,
    minPriceWeight: PropTypes.number,
    minPriceSum: PropTypes.number,
    isFormValid: PropTypes.bool
  }),
  invoiceDetailsData: PropTypes.shape({
    items: PropTypes.array,
    metalCost: PropTypes.number,
    isFormValid: PropTypes.bool
  })
};



export default ExchangeCreateSummary;