import React from 'react';
import { withStyles } from 'material-ui/styles';
import Grid  from 'material-ui/Grid';

import OrdersList from './OrdersList';
import MetalsSum from '../MetalsSum';
import styles from './styles';

const Orders = ({ totalWeight }) => {
  return (
    <Grid container spacing={8}>
      <Grid item xs={9}>
        <OrdersList />
      </Grid>
      <Grid item xs={3}>
        <MetalsSum totalWeight={totalWeight} />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Orders);
