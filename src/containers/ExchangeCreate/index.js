 import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector, getFormSyncErrors } from 'redux-form';
import { compose } from 'recompose';
import { withStyles } from 'material-ui/styles';

import styles from './styles';
import ExchangeForm from '../../components/ExchangeForm';
import validate from './validate';
import { calcTotalWeight, hasWeightErrors } from './utils';


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

class ExchangeCreate extends Component {
  render() {
    const { classes, handleSubmit, orders, errors } = this.props;
    const totalWeight = !hasWeightErrors(errors) ?
      calcTotalWeight(orders) : false;
    return (
      <div className={classes.root}>
        <ExchangeForm
          handleSubmit={handleSubmit}
          totalWeight={totalWeight}
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
      orders: selector(state, 'orders'),
      errors: getFormSyncErrors('exchangeCreateForm')(state)
    };
  })
)(ExchangeCreate);
