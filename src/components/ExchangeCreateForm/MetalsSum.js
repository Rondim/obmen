import React from 'react';
import PropTypes from 'prop-types';
import { Div, Span } from 'glamorous';
import { pure } from 'recompose';

const cssForVA = {
  position: 'relative',
  top: '50%',
  transform: 'perspective(1px) translateY(-50%)'
};

const MetalsSum = ({ totalWeight, hasErrors }) => {
  return (
    <Div
      height="100%">
      {hasErrors ?
        <Div css={cssForVA}>Невозможно рассчитать</Div>
        :
        <Div
          css={cssForVA}>
          {`Общая масса в пробе 585 = `}
          <Span
            fontWeight="bold">
            {`${totalWeight} г`}
          </Span>
        </Div>
      }
    </Div>
  );
};

MetalsSum.propTypes = {
  totalWeight: PropTypes.number.isRequired
};
MetalsSum.defaultProps = {
  totalWeight: 0
};

export default pure(MetalsSum);