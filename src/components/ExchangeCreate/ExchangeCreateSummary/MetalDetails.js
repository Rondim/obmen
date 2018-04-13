import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import { METAL_PRICES } from '../../../consts';
const {
  METAL_MAX_PRICE,
  METAL_MED_PRICE,
  METAL_MIN_PRICE } = METAL_PRICES;

const RootDivS = glamorous.div({
  textAlign: 'left',
  height: '200px',
  margin: '15px 0',
  padding: '5px'
});
const HrS = glamorous.hr({
  border: '1px solid black',
  width: '80%',
  float: 'left',
  margin: '8px 0'
});

const MetalDetails = props => {
  const { metalCost, maxPriceSum, maxPriceWeight, 
    medPriceSum, medPriceWeight, minPriceSum, minPriceWeight,
    isFormValid } = props;
  return (
    <RootDivS>
      <h3>Стоимость лома</h3>
      {isFormValid ?
        <div>
          {maxPriceSum === 0 ? null :
            <div>
              {`${maxPriceWeight} г по ${METAL_MAX_PRICE} р = ${maxPriceSum}`}
            </div>
          }
          {medPriceSum === 0 ? null :
            <div>
              {`${medPriceWeight} г по ${METAL_MED_PRICE} р = ${medPriceSum}`}
            </div>
          }
          {minPriceSum === 0 ? null :
            <div>
              {`${minPriceWeight} г по ${METAL_MIN_PRICE} р = ${minPriceSum}`}
            </div>
          }
          <HrS />
          {metalCost === 0 ? null: 
            <div>
              {`Округленная стоимость лома = `}
              <strong>
                {metalCost}
              </strong>
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

MetalDetails.propTypes = {
  metalCost: PropTypes.number,
  maxPriceWeight: PropTypes.number,
  maxPriceSum: PropTypes.number,
  medPriceWeight: PropTypes.number,
  medPriceSum: PropTypes.number,
  minPriceWeight: PropTypes.number,
  minPriceSum: PropTypes.number,
  isFormValid: PropTypes.bool
};


export default MetalDetails;