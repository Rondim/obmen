import React, { Component } from 'react';
import { FieldArray } from 'redux-form';
import { Button } from 'reactstrap';
import glamorous from 'glamorous';

import OrdersListItem from './OrdersListItem';
import { METALS } from '../../../consts';


const defaultMetalValue = METALS[0].value;

const AddButtonS = glamorous(Button)({
  width: '30%'
});
const OrdersListDivS = glamorous.div({
  padding: '15px 0'
});
const HeadingS = glamorous.h3({
  textAlign: 'left'
});

class OrdersList extends Component {
  handleDeleteItem = (fields) => (index) => {
    if (fields.length > 1) fields.remove(index);
  }
  handleAddItem = (fields) => {
    fields.push({ metal: defaultMetalValue });
  }

  renderOrdersList = ({ fields }) => {
    if (fields.length === 0) fields.push({ metal: defaultMetalValue });
    return (
      <OrdersListDivS>
        <HeadingS>Покупки</HeadingS>
        {fields.map((member, index, fields) => {
          return <OrdersListItem
            fields={fields}
            key={index}
            index={index}
            member={member}
            onClick={this.handleDeleteItem(fields)}
          />
        })}
        <AddButtonS
          onClick={() => this.handleAddItem(fields)}
        >
          +
        </AddButtonS>
      </OrdersListDivS>
    );
  }
  render() {
    return (
      <FieldArray
        name="orders"
        component={this.renderOrdersList}
      />
    );
  }
}

export default OrdersList;