import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import glamorous, { H3, Hr, Div, Tr } from 'glamorous';

const TdWithTopBorderS = glamorous.td({
  borderTop: '1px solid black !important'
});
const TableS = glamorous(Table)({
  marginBottom: '0 !important'
});

const renderRows = (items, metalCost) => {
  let output = items.map((item, index) => {
    const { metal, weight, costPerGram, cost } = item;
    return (
      <tr key={index}>
        <td>{metal}</td>
        <td>{weight}</td>
        <td>{costPerGram}</td>
        <td>{cost}</td>
      </tr>
    );
  });
  if (items.length > 0) {
    output.push(
      <Tr
        key={items.length}>
        <TdWithTopBorderS colSpan="3">
          Общая стоимость лома
        </TdWithTopBorderS>
        <TdWithTopBorderS>
          {metalCost}
        </TdWithTopBorderS>
      </Tr>
    );
  }
  
  return output;
}

const InvoiceDetails = ({ items, metalCost, isFormValid }) => {
  return (
    <div>
      <H3 css={{ textAlign: 'left'}}>
        Данные для накладной
      </H3>
      <TableS>
        <thead>
          <tr>
            <th>Проба</th>
            <th>Вес</th>
            <th>Цена за г</th>
            <th>Стоимость</th>
          </tr>
        </thead>  
        <tbody>
          {renderRows(items, metalCost)}
        </tbody>
      </TableS>
      {isFormValid ?
        null
        :
        [
          <Hr 
            key='hr' 
            css={{ border: '1px solid black', margin: '0' }} 
          />,
          <Div
            key='calc is not possible'
            css={{ padding: '10px 0' }}>
            Невозможно рассчитать
          </Div>
        ]
      }
    </div>
  );
};

InvoiceDetails.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    metal: PropTypes.string.isRequired,
    weight: PropTypes.number.isRequired,
    costPerGram: PropTypes.number.isRequired,
    cost: PropTypes.number.isRequired
  })),
  metalCost: PropTypes.number,
  isFormValid: PropTypes.bool
};

export default InvoiceDetails;