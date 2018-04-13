import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import glamorous from 'glamorous';

import OrdersList from './OrdersList';
import MetalsList from './MetalsList';
import OrdersSum from './OrdersSum';
import MetalsSum from './MetalsSum';

const ColS = glamorous(Col)({
  backgroundColor: '#f0f0f0',
  padding: '0 15px',
  marginTop: '10px'
});

const ExchangeCreateForm = ({ ordersSumData, metalsSumData }) => {
  return (
    <div>
        <Row>
          <ColS xs="9">
            <OrdersList />
          </ColS>
          <ColS xs="3">
            <OrdersSum {...ordersSumData} />
          </ColS>
          <ColS xs="9">
            <MetalsList />
          </ColS>
          <ColS xs="3">
            <MetalsSum {...metalsSumData} />
          </ColS>
        </Row>
    </div>
  );
};

ExchangeCreateForm.propTypes = {
  ordersSumData: PropTypes.object,
  metalsSumData: PropTypes.object
}

export default ExchangeCreateForm;