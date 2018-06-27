import React, { Component } from 'react';
import { FieldArray } from 'redux-form';
import { Button } from 'reactstrap';
import glamorous from 'glamorous';

import MetalsListItem from './MetalsListItem';
import { METALS } from '../../../consts';

const defaultMetalValue = METALS[0].value;


const AddButtonS = glamorous(Button)({
  width: '30%'
});
const MetalsListDivS = glamorous.div({
  padding: '15px 0'
});
const HeadingS = glamorous.h3({
  textAlign: 'left'
});

class MetalList extends Component {
  handleDeleteItem = (fields) => (index) => {
    if (fields.length > 1) fields.remove(index);
  }
  handleAddItem = (fields) => {
    fields.push({ probe: defaultMetalValue });
  }

  renderMetalsList = ({ fields }) => {
    if (fields.length === 0) fields.push({ metal: defaultMetalValue });
    return (
      <MetalsListDivS>
        <HeadingS>Лом</HeadingS>
        {fields.map((member, index, fields) => (
          <MetalsListItem
            key={index}
            index={index}
            member={member}
            onClick={this.handleDeleteItem(fields)}
          />
        ))}
        <AddButtonS
          onClick={() => this.handleAddItem(fields)}
        >
          +
          </AddButtonS>
      </MetalsListDivS>
    );
  }
  render() {
    return (
      <FieldArray
        name="metals"
        component={this.renderMetalsList}
      />
    );
  }
}

export default MetalList;