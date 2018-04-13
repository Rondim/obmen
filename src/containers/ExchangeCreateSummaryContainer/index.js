import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector, isValid } from 'redux-form';

import ExchangeCreateSummary from '../../components/ExchangeCreate/ExchangeCreateSummary';
import { calcExchangeDetails } from './utils';

class ExchangeCreateSummaryContainer extends Component {
  static propTypes = {
    exchangeDetailsData: PropTypes.object,
    metalDetailsData: PropTypes.object,
    invoiceDetailsData: PropTypes.object,
    isFormValid: PropTypes.bool
  }
  render() {
    const { exchangeDetailsData, metalDetailsData, invoiceDetailsData } = this.props;
    return (
      <ExchangeCreateSummary 
        exchangeDetailsData={exchangeDetailsData}
        metalDetailsData={metalDetailsData}
        invoiceDetailsData={invoiceDetailsData}
      />
    );
  }
}

const selector = formValueSelector('ExchangeCreateForm');

const mapStateToProps = state => {
  const valid = isValid('ExchangeCreateForm')(state);
  const { orders, metals } = selector(state, 'orders', 'metals');
  const { 
    metalDetails, 
    exchangeDetails, 
    invoiceDetails,
    isFormValid } = calcExchangeDetails(orders, metals, 0.12, valid);
  console.log(metalDetails, exchangeDetails, invoiceDetails, isFormValid);
  return { 
    exchangeDetailsData: { ...exchangeDetails, isFormValid },
    metalDetailsData: { ...metalDetails, isFormValid },
    invoiceDetailsData: { ...invoiceDetails, isFormValid }
  };
};

export default connect(mapStateToProps)(ExchangeCreateSummaryContainer);