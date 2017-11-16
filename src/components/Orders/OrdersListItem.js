import React from 'react';
import { withStyles } from 'material-ui/styles';
import { Field } from 'redux-form';
import { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import RemoveCircleOutline from 'material-ui-icons/RemoveCircleOutline';

import styles from './styles';
import { METALS } from '../../consts';
import renderTextField from '../RFrenderers/renderTextField';
import renderSelectField from '../RFrenderers/renderSelectField';

const OrdersListItem = ({ member, index, onClick, classes }) => {
  return (
    <tr>
      <td>
        <Field
          name={`${member}.weight`}
          component={renderTextField}
         />
      </td>
      <td>
        <Field
          name={`${member}.metal`}
          component={renderSelectField}
          >
            {METALS.filter(metal => metal.orders).map(metal => {
              return <MenuItem
                key={metal.value}
                value={metal.value}>
                {metal.name}
              </MenuItem>
            })}
        </Field>
      </td>
      <td>
        <Field
          name={`${member}.cost`}
          component={renderTextField}
         />
      </td>
      <td>
        <Button className={classes.removeButton}>
          <RemoveCircleOutline
            onClick={() => onClick(index)}
            className={classes.removeButtonIcon} />
        </Button>
      </td>
    </tr>
  );
};

export default withStyles(styles)(OrdersListItem);
