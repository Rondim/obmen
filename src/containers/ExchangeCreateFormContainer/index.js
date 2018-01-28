import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm, formValueSelector, getFormSyncErrors } from 'redux-form';

import ExchangeCreateForm from '../../components/ExchangeCreateForm';
import { calcOrdersSum, calcMetalsSum } from './utils'; 
import { METALS } from '../../consts.js';
// import validate from './validate';

class ExchangeCreateFormContainer extends Component {
  static propTypes = {
    ordersSumData: PropTypes.object,
    metalsSumData: PropTypes.object
  }
  componentWillMount() {
    this.props.initialize({
      orders: [{ metal: METALS[0].value }],
      metals: [{ metal: METALS[0].value }],
    });
  }
  render() {
    const { ordersSumData, metalsSumData } = this.props;
    return (
      <form>
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

