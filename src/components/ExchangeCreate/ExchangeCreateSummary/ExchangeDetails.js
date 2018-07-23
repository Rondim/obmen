import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import _ from 'lodash';

const RootDivS = glamorous.div({
  textAlign: 'left',
  height: '200px',
  margin: '15px 0',
  padding: '5px'
});

const ExchangeDetails = props => {
  const { totalCost = 0, discount = 0, metalsCost = 0, toPay = 0, toIssue = 0, notGivenDiscounts = 0, isFormValid } = props;
  return (
    <RootDivS>
      <h3>Детали обмена</h3>
      {isFormValid ?
        <div>
          {totalCost === 0 ? null :
            <div>
              {`Стоимость покупок = `}<strong>{_.round(totalCost)}</strong>
            </div>
          }
          {discount === 0 ? null :
            <div>
              {`Скидка = `}<strong>{_.round(discount)}</strong>
            </div>
          }
          {metalsCost === 0 ? null :
            <div>
              {`Стоимость лома = `}<strong>{_.round(metalsCost)}</strong>
            </div>
          }
          {toPay === 0 ? null :
            <div>
              {`Необходимо доплатить = `}<strong>{_.round(toPay, -1)}</strong>
            </div>
          }
          {toIssue === 0 ? null :
            <div>
              {`К выплате = `}<strong>{_.round(toIssue, -1)}</strong>
            </div>
          }
          {notGivenDiscounts === 0 ? null :
            <div>
              {`Невыданные скидки `}<strong>{_.round(notGivenDiscounts, -1)}</strong>
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