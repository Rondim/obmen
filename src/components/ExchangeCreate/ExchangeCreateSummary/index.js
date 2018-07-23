import React from 'react';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';

import ExchangeDetails from './ExchangeDetails';
import MetalDetails from './MetalDetails';
import InvoiceDetails from './InvoiceDetails';

const ExchangeCreateSummary = ({ exchangeDetails, metalDetails, invoiceDetails }) => {
  return (
    <Row>
      <Col xs="6">
        <ExchangeDetails {...exchangeDetails} />
      </Col>
      <Col xs="6">
        <MetalDetails {...metalDetails} />
      </Col>
      <Col xs="12">
        <InvoiceDetails {...invoiceDetails} />
      </Col>
    </Row>
  );
};

ExchangeCreateSummary.propTypes = {
  exchangeDetails: PropTypes.shape({
    totalCost: PropTypes.number,
    discount: PropTypes.number,
    metalsCost: PropTypes.number,
    toPay: PropTypes.number,
    toIssue: PropTypes.number,
    isFormValid: PropTypes.bool,
    notGivenDiscounts: PropTypes.number
  }),
  metalDetails: PropTypes.shape({
    metalCost: PropTypes.number,
    metalsWithCosts: PropTypes.array,
    isFormValid: PropTypes.bool
  }),
  invoiceDetails: PropTypes.shape({
    invoiceMetals: PropTypes.array,
    metalsCost: PropTypes.number,
    isFormValid: PropTypes.bool
  })
};



export default ExchangeCreateSummary;