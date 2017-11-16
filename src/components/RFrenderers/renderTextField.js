import React from 'react';
import Input from 'material-ui/Input';

const renderTextField = ({
  input,
  meta,
  ...custom
}) => (
  <Input
    {...input}
    {...custom}
  />
);

export default renderTextField;
