import React, { Component } from 'react';
import { formValues } from 'redux-form';
import { Input } from 'glamorous';
import PropTypes from 'prop-types';

class WeightInput extends Component {
  constructor(props) {
    super(props);
    this.lastMetalValue = null;
  }
  static propTypes = {
    metalValue: PropTypes.string,
    member: PropTypes.string.isRequired
  }
  componentWillReceiveProps(props) {
    const { metalValue, input: { onChange } } = props;
    const lastMetalValue = this.lastMetalValue;
    if (metalValue !== lastMetalValue) {
      if (metalValue === 'AG_925') {
        onChange('0') 
      } 
      if (lastMetalValue === 'AG_925') {
        onChange('')
      }
    }
    this.lastMetalValue  = metalValue;
  }
  
  render() {
    const { input, meta, metalValue, ...rest } = this.props;
    const visibility = metalValue === 'AG_925' ? 'hidden' : 'visible';
    return (
      <Input
        {...input}
        {...meta}
        {...rest}
        css={{visibility}} />
    );
  }
}

export default formValues(({ member }) => {
  return { metalValue: `${member}.probe` };
})(WeightInput);