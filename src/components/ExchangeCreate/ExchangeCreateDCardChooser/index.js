import React from 'react';
import { Row, Col, FormGroup } from 'reactstrap';
import { Field } from 'redux-form';
import { DISCOUNT_TYPES } from '../../../consts';
import glamorous from 'glamorous';

const FormGroupS = glamorous(FormGroup)({
  marginBottom: '0 !important'
});
const DivS = glamorous.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%'
});

const DCardChooser = () => {
  return (
    <Row>
      <Col xs="2" />
      <Col xs="4">
        <DivS>
          Дисконтная карта
        </DivS>
      </Col>
      <Col xs="4">
        <FormGroupS>
          <Field
            name="discountCard"
            component="select"
            className="form-control"
          >
            {DISCOUNT_TYPES.order.map(type => {
              return <option
                key={type}
                value={type}
              >
                {type}
              </option>
            })}
          </Field>
        </FormGroupS>
      </Col>
      <Col xs="2" />
    </Row>
  )
};

export default DCardChooser;
