import React from 'react';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';

const renderSelectField = ({
  input,
  meta,
  defaultValue,
  children,
  ...custom
}) => {
  if (defaultValue) input.value = input.value || defaultValue;
  return (
    <FormControl>
      <Select
        {...input}
        {...custom}
        onChange={(e) => input.onChange(e.target.value)}
        children={children}
      />
    </FormControl>
  )
};

export default renderSelectField;
