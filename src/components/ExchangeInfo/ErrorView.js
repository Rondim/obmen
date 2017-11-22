import React from 'react';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

import styles from './styles';

const ErrorView = ({ classes }) => {
  return (
    <Paper className={classes.errorView}>
      <div>
        <span>Невозможно произвести расчет. Есть ошибки в форме.</span>
      </div>
    </Paper>
  );
}

export default withStyles(styles)(ErrorView);
