import React from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';

import styles from './styles';
import Orders from '../Orders';
import ScrapMetals from '../ScrapMetals';

const ExchangeForm = ({
  classes, handleSubmit, ordersWeight, scrapMetalsWeight }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Orders totalWeight={ordersWeight}/>
      <ScrapMetals totalWeight={scrapMetalsWeight}/>
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Paper className={classes.exchangeCalc}>
            <Button type="submit">Рассчитать обмен</Button>
          </Paper>
        </Grid>
      </Grid>
    </form>
  );
}

export default withStyles(styles)(ExchangeForm);
