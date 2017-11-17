import React from 'react';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

import ScrapMetalsList from './ScrapMetalsList';
import MetalsSum from '../MetalsSum';
import styles from './styles';

const ScrapMetals = ({ totalWeight }) => {
  return (
    <Grid container spacing={8}>
      <Grid item xs={9}>
        <ScrapMetalsList />
      </Grid>
      <Grid item xs={3}>
        <MetalsSum totalWeight={totalWeight} />
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(ScrapMetals);
