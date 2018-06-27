import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import glamorous, { H3, Hr, Div, Tr } from 'glamorous';
import _ from 'lodash';

const TdWithTopBorderS = glamorous.td({
  borderTop: '1px solid black !important'
});
const TableS = glamorous(Table)({
  marginBottom: '0 !important'
});

const renderRows = (invoiceMetals, metalsCost) => {
  let output = invoiceMetals.map((metal, index) => {
    const { probe, weight, avgGramCost, cost } = metal;
    return (
      <tr key={index}>
        <td>{probe}</td>
        <td>{_.round(weight, 2)}</td>
        <td>{_.round(avgGramCost)}</td>
        <td>{_.round(cost)}</td>
      </tr>
    );
  });
  if (invoiceMetals.length > 0) {
    output.push(
      <Tr
        key={invoiceMetals.length}>
        <TdWithTopBorderS colSpan="3">
          Общая округленная стоимость лома
        </TdWithTopBorderS>
        <TdWithTopBorderS>
          <strong>{_.round(metalsCost)}</strong>
        </TdWithTopBorderS>
      </Tr>
    );
  }
  
  return output;
}

const InvoiceDetails = ({ invoiceMetals, metalsCost, isFormValid }) => {
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
            <th>Ср. цена за г</th>
            <th>Стоимость</th>
          </tr>
        </thead>  
        <tbody>
          {renderRows(invoiceMetals, metalsCost)}
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
  invoiceMetals: PropTypes.arrayOf(PropTypes.shape({
    probe: PropTypes.string.isRequired,
    weight: PropTypes.number.isRequired,
    avgGramCost: PropTypes.number.isRequired,
    cost: PropTypes.number.isRequired
  })),
  metalsCost: PropTypes.number,
  isFormValid: PropTypes.bool
};

export default InvoiceDetails;