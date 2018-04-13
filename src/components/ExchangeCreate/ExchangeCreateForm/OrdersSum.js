import React from 'react';
import PropTypes from 'prop-types';
import { Div, Span } from 'glamorous';
import { pure } from 'recompose';

const cssForVerticalAlign = {
  position: 'relative',
  top: '50%',
  transform: 'perspective(1px) translateY(-50%)'
};

const OrdersSum = ({ totalWeight, totalCost, hasErrors }) => {
  return (
    <Div
      height="100%">
      {hasErrors ?
        <Div css={cssForVerticalAlign}>
          Невозможно рассчитать
        </Div>
       :
        <Div css={cssForVerticalAlign}>
          <div>
            {`Масса золота в 585 пробе = `}
            <Span
              fontWeight="bold">
              {`${totalWeight} г`}
            </Span>
          </div>
          <div>
            {`Общая сумма покупок = `}
            <Span
              fontWeight="bold">
              {`${totalCost} р`}
            </Span>
          </div>
        </Div>
      }
    </Div>
  );
};

OrdersSum.propTypes = {
  totalWeight: PropTypes.number.isRequired,
  totalCost: PropTypes.number.isRequired,
  hasError: PropTypes.bool
};
OrdersSum.defaultProps = {
  totalWeight: 0,
  totalCost: 0
};

export default pure(OrdersSum);