import React from 'react';
import { Row, Col, FormGroup, Button } from 'reactstrap';
import { Field } from 'redux-form';
import glamorous from 'glamorous';

import { METALS } from '../../../consts';
import { convertToNum, valNum } from './utils';
import WeightInput from './WeightInput';

const ColS = glamorous(Col)({
  padding: '0 !important'
});

const Checkbox = ({ input, meta, rest }) => {
  const { onChange: makeChange, value } = input;
  return <input type="checkbox" onChange={() => makeChange(!value)} />;
};


const MetalsListItem = ({ member, index, onClick }) => {
  return (
    <Row>
      <Col xs="1">
        <FormGroup>
          <Field
            name={`${member}.hasStones`}
            placeholder="Масса"
            component={Checkbox}
            className="form-control"
            member={member}
          />
        </FormGroup>
      </Col>
      <Col xs="3">
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
            name={`${member}.probe`}
            component="select"
            className="form-control"
          >
            {METALS.filter(metal => metal.reception).map(metal => {
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
};

export default MetalsListItem;