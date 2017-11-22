import React from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

import styles from './styles';

const ExchangeButton = ({ onClick, classes }) => {
  return (
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <Paper className={classes.exchangeCalc}>
          <Button
            type="submit"
            onClick={onClick}
            >
            Сделать обмен
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(ExchangeButton);
