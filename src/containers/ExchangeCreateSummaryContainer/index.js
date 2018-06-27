import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector, isValid } from 'redux-form';

import ExchangeCreateSummary from '../../components/ExchangeCreate/ExchangeCreateSummary';
import calcData from './calcData';

class ExchangeCreateSummaryContainer extends Component {
  static propTypes = {
    exchangeDetails: PropTypes.object,
    metalDetails: PropTypes.object,
    invoiceDetails: PropTypes.object
  }
  render() {
    const { exchangeDetails, metalDetails, invoiceDetails } = this.props;
    return (
      <ExchangeCreateSummary 
        exchangeDetails={exchangeDetails}
        metalDetails={metalDetails}
        invoiceDetails={invoiceDetails}
      />
    );
  }
}

const selector = formValueSelector('ExchangeCreateForm');

const mapStateToProps = state => {
  const valid = isValid('ExchangeCreateForm')(state);
  const { 
    orders, metals: scrapMetals, discountCard: memberType
  } = selector(state, 'orders', 'metals', 'discountCard');

  const { dataForView: {
    exchangeDetails, metalDetails, invoiceDetails
  } } = calcData({ scrapMetals, orders, memberType, valid });

  console.log(metalDetails, exchangeDetails, invoiceDetails, valid);
  return { 
    exchangeDetails: {...exchangeDetails, isFormValid: valid}, 
    metalDetails: { ...metalDetails, isFormValid: valid }, 
    invoiceDetails: { ...invoiceDetails, isFormValid: valid }
  };
};

export default connect(mapStateToProps)(ExchangeCreateSummaryContainer);