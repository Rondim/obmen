 import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector, getFormSyncErrors } from 'redux-form';
import { compose } from 'recompose';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import _ from 'lodash';

import styles from './styles';
import Orders from './Orders';
import validate from './validate';
import { METALS } from './consts';
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

class ExchangeForm extends Component {
  render() {
    const { classes, handleSubmit, orders, errors } = this.props;
    console.log('calcTotalWeight is', calcTotalWeight(orders));
    const totalWeight = !hasWeightErrors(errors) ?
      calcTotalWeight(orders) : false;
    return (
      <div className={classes.root}>
        <form onSubmit={handleSubmit}>
          <Orders totalWeight={totalWeight}/>
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <Paper className={classes.exchangeCalc}>
                <Button type="submit">Рассчитать обмен</Button>
              </Paper>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

// const ordersSelector = formValueSelector('')

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
)(ExchangeForm);
