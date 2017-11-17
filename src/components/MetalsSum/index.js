import React from 'react';
import { compose } from 'recompose';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

import styles from './styles';

const MetalsSum = ({ classes, totalWeight }) => {
  return (
    <Paper className={classes.paper}>
      <div className={classes.totalWeight}>
        {totalWeight || totalWeight === 0 ?
          `Общая масса равняется ${totalWeight} грамма` :
          'Невозможно посчитать массу'}
      </div>
    </Paper>
  );
};

export default compose(
  withStyles(styles)
)(MetalsSum);
