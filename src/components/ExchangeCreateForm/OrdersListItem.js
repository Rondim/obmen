import React, { Component } from 'react';
import { Row, Col, FormGroup, Button } from 'reactstrap';
import { Field } from 'redux-form';
import glamorous from 'glamorous';

import WeightInput from './WeightInput';
import { METALS } from '../../consts';
import { convertToNum, valNum } from './utils';

const ColS = glamorous(Col)({
  padding: '0 !important'
});
  
class OrderListItem extends Component {
  render() {
    const { member, index, onClick } = this.props;
    return (
      <Row>
        <Col xs="4">
          <FormGroup>
            <Field
              name={`${member}.weight`}
              placeholder="Масса"
              component={WeightInput}
              className="form-control"
              parse={convertToNum}
              validate={valNum}
              member={member}
            />
          </FormGroup>
        </Col>
        <Col xs="3">
          <FormGroup>
            <Field
              name={`${member}.metal`}
              component="select"
              className="form-control"
            >
              {METALS.filter(metal => metal.orders).map(metal => {
                return <option
                  key={metal.value}
                  value={metal.value}
                >
                  {metal.name}
                </option>
              })}
            </Field>
          </FormGroup>
        </Col>
        <Col xs="4">
          <FormGroup>
            <Field
              name={`${member}.cost`}
              placeholder="Цена"
              component="input"
              className="form-control"
              parse={convertToNum}
              validate={valNum}
            />
          </FormGroup>
        </Col>
        <ColS
          xs="1"
        >
          <Button
            onClick={() => onClick(index)}
            color="danger"
          >
            -
        </Button>
        </ColS>
      </Row>
    );
  }
};

export default OrderListItem;