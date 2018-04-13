import React from 'react';
import { Container } from 'reactstrap';
import glamorous from 'glamorous';

import ExchangeCreateFormContainer from '../../containers/ExchangeCreateFormContainer';
import ExchangeCreateSummaryContainer from '../../containers/ExchangeCreateSummaryContainer';

const DivS = glamorous.div({
  width: '768px',
  margin: '0 auto',
  background: '#e5e5e5',
  textAlign: 'center'
});

const ExchangeCreate = () => {
  return (
    <DivS>
      <Container>
        <ExchangeCreateFormContainer />
        <ExchangeCreateSummaryContainer />
      </Container>
    </DivS>
  );
};

export default ExchangeCreate;