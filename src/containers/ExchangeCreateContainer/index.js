import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector, getFormSyncErrors } from 'redux-form';
import { compose } from 'recompose';
import { withStyles } from 'material-ui/styles';

import styles from './styles';
import ExchangeCreate from '../../components/ExchangeCreate';
import validate from './validate';
import { calcTotalWeight, calcExchangeData, calcInvoiceData,
  hasWeightErrors, hasCostErrors } from './utils';
import { METALS, DISCOUNT_TYPES } from '../../consts.js';

const handleSubmit = (values) => {
  console.log(values);
}
const handleSubmitFail = (errors, dispatch, submitError) => {
  console.log('errors: ', errors);
  console.log('submitError: ', submitError);
}
const handleSubmitSuccess = (result, dispatch) => {
  console.log('result: ', result);
}


class ExchangeCreateContainer extends Component {
  componentWillMount() {
    this.props.initialize({
      discountType: DISCOUNT_TYPES.types[DISCOUNT_TYPES.default].value,
      orders: [{ metal: METALS[0].value}],
      scrapMetals: [{ metal: METALS[0].value}],
    })
  }

  render() {
    const { classes, handleSubmit,
      discountType, orders, scrapMetals, errors } = this.props;

    let exchangeData = { discount: 0, exchanges: [], itemsCost: 0 };
    let invoiceData = false;
    const ordersWeight = !errors || !hasWeightErrors(errors.orders) ?
      calcTotalWeight(orders) : false;
    const scrapMetalsWeight = !errors || !hasWeightErrors(errors.scrapMetals) ?
      calcTotalWeight(scrapMetals) : false;
    const hasErrors = hasWeightErrors(errors.orders) || hasWeightErrors(errors.scrapMetals)
      || hasCostErrors(errors.orders);;
    if (!hasErrors && !!orders) {
      exchangeData = calcExchangeData(orders, scrapMetals, DISCOUNT_TYPES['types'][discountType]['discountRate']);
      invoiceData = calcInvoiceData(orders, scrapMetals, DISCOUNT_TYPES['types'][discountType]['discountRate']);
    }
    return (
      <div className={classes.root}>
        <ExchangeCreate
          handleSubmit={handleSubmit}
          discountType={discountType}
          ordersWeight={ordersWeight}
          scrapMetals={scrapMetals}
          scrapMetalsWeight={scrapMetalsWeight}
          exchangeData={exchangeData}
          invoiceData={invoiceData}
          hasErrors={hasErrors}
        />
      </div>
    );
  }
}

const selector = formValueSelector('exchangeCreateForm');
export default compose(
  withStyles(styles),
  reduxForm({
    form: 'exchangeCreateForm',
    onSubmit: handleSubmit,
    onSubmitFail: handleSubmitFail,
    onSubmitSuccess: handleSubmitSuccess,
    validate
  }),
  connect(state => {
    return {
      discountType: selector(state, 'discountType'),
      orders: selector(state, 'orders'),
      scrapMetals: selector(state, 'scrapMetals'),
      errors: getFormSyncErrors('exchangeCreateForm')(state)
    };
  })
)(ExchangeCreateContainer);
