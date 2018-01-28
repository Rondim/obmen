import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

const RootDivS = glamorous.div({
  textAlign: 'left',
  height: '200px',
  margin: '15px 0',
  padding: '5px'
});

const ExchangeDetails = props => {
  const { totalCost, discount, metalCost, toPay, toIssue, isFormValid } = props;
  return (
    <RootDivS>
      <h3>Детали обмена</h3>
      {isFormValid ?
        <div>
          {totalCost === 0 ? null :
            <div>
              {`Стоимость покупок = `}<strong>{totalCost}</strong>
            </div>
          }
          {discount === 0 ? null :
            <div>
              {`Скидка = `}<strong>{discount}</strong>
            </div>
          }
          {metalCost === 0 ? null :
            <div>
              {`Стоимость лома = `}<strong>{metalCost}</strong>
            </div>
          }
          {toPay === 0 ? null :
            <div>
              {`Необходимо доплатить = `}<strong>{toPay}</strong>
            </div>
          }
          {toIssue === 0 ? null :
            <div>
              {`К выплате = `}<strong>{toIssue}</strong>
            </div>
          }
        </div>
        :
        <div>
          Невозможно рассчитать
        </div>
      }
    </RootDivS>
  );
};

ExchangeDetails.propTypes = {
  totalCost: PropTypes.number,
  discount: PropTypes.number,
  metalCost: PropTypes.number,
  toPay: PropTypes.number,
  toIssue: PropTypes.number,
  isFormValid: PropTypes.bool
};

export default ExchangeDetails;