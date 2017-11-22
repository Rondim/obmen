import React from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import { Field } from 'redux-form';
import { withStyles } from 'material-ui/styles';

import styles from './styles';
import renderSelectField from '../RFrenderers/renderSelectField';
import { DISCOUNT_TYPES } from '../../consts';

const DCardChooser = ({ classes, discountType }) => {
  return (
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <Paper className={classes.root}>
          <span>Вид дисконтной карты</span>
          <Field
            name="discountType"
            component={renderSelectField}
            >
              {DISCOUNT_TYPES.order.map(typeId => {
                const { value, name } = DISCOUNT_TYPES.types[typeId];
                return <MenuItem
                  key={value}
                  value={value}>
                  {name}
                </MenuItem>;
              })}
          </Field>
        </Paper>
      </Grid>
    </Grid>
  )
};

export default withStyles(styles)(DCardChooser);
