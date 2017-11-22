import React from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

import styles from './styles';


const ExcessView = ({ classes, exchangesCost, itemsCost }) => {
  return (
    <Paper className={classes.excessView}>
      <div>
        <span>{`Стоимость лома ${exchangesCost} рублей, что превышает
          стоимость изделий ${itemsCost}`}</span>
      </div>
    </Paper>
  );
};

export default withStyles(styles)(ExcessView);
