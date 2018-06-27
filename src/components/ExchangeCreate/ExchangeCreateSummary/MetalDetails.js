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
const HrS = glamorous.hr({
  border: '1px solid black',
  width: '80%',
  float: 'left',
  margin: '8px 0'
});

const MetalDetails = props => {
  const { metalsCost = 0, metalsWithCosts = [], isFormValid } = props;
  return (
    <RootDivS>
      <h3>Стоимость лома</h3>
      {isFormValid ?
        <div>
          {metalsWithCosts.map(({ weight, gramCost, cost }, index) => (
            <div key={index}>
              {`${_.round(weight, 2)} г по ${_.round(gramCost)} р = ${_.round(cost)}`}
            </div>
          ))}
          <HrS />
          {metalsCost === 0 ? null: 
            <div>
              {`Округленная стоимость лома = `}
              <strong>
                {_.round(metalsCost)}
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
  metalsCost: PropTypes.number,
  metalsWithCosts: PropTypes.array,
  isFormValid: PropTypes.bool
};


export default MetalDetails;