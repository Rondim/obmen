import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm, formValueSelector, getFormSyncErrors } from 'redux-form';

import ExchangeCreateForm from '../../components/ExchangeCreate/ExchangeCreateForm';
import ExchangeCreateDCardChooser from '../../components/ExchangeCreate/ExchangeCreateDCardChooser';
import { calcOrdersSum, calcMetalsSum } from './utils'; 
import { METALS, DISCOUNT_TYPES } from '../../consts.js';


class ExchangeCreateFormContainer extends Component {
  static propTypes = {
    ordersSumData: PropTypes.object,
    metalsSumData: PropTypes.object
  }
  componentWillMount() {
    this.props.initialize({
      orders: [{ probe: METALS[0].value, isWedding: false }],
      metals: [{ probe: METALS[0].value, hasStones: false }],
      discountCard: DISCOUNT_TYPES.default
    });
  }
  render() {
    const { ordersSumData, metalsSumData } = this.props;
    return (
      <form>
        <ExchangeCreateDCardChooser />
        <ExchangeCreateForm
          ordersSumData={ordersSumData}
          metalsSumData={metalsSumData}
        />
      </form>
    );
  }
}

const selector = formValueSelector('ExchangeCreateForm');

const mapStateToProps = state => {
  const errors = getFormSyncErrors('ExchangeCreateForm')(state);
  const ordersSumData = calcOrdersSum(selector(state, 'orders'), errors);
  const metalsSumData = calcMetalsSum(selector(state, 'metals'), errors);
  console.log('state',state);
  return { ordersSumData, metalsSumData, errors };
};

export default compose(
  reduxForm({
    form: 'ExchangeCreateForm'
    // validate
  }),
  connect(mapStateToProps)
)(ExchangeCreateFormContainer);

