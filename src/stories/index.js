import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ExchangeCreateDCardChooser from '../components/ExchangeCreate/ExchangeCreateDCardChooser';
import { reduxForm } from 'redux-form';

const DecComponent = reduxForm({ form: 'form' })(ExchangeCreateDCardChooser);

storiesOf('ExchangeCreateDCardChooser', module)
  .add('component', () => (
    <DecComponent />
  ));


  // .add('with text', () => (
  //   <Button onClick={action('clicked')}>Hello Button</Button>
  // ))
  // .add('with some emoji', () => (
  //   <Button onClick={action('clicked')}><span role="img" aria-label="so cool">😀 😎 👍 💯</span></Button>
  // ));