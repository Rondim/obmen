import React from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import styles from './styles';
import InfoDiagram from './InfoDiagram';
import InfoDetail from './InfoDetail';
import ErrorView from './ErrorView';

const ExchangeInfo = ({ classes, discount, exchanges, itemsCost, hasErrors }) => {
  const exchangesCost = Math.round(
    exchanges.reduce((sum, { weight, gCost }) => sum += weight * gCost, 0) / 10
  ) * 10;
  return (
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <div className={classes.calcHeading}>РАСЧЕТ</div>
      </Grid>
      {hasErrors ?
        <Grid item xs={12}>
          <ErrorView />
        </Grid> :
        <Grid container spacing={8}>
          <Grid item xs={6}>
            <InfoDiagram
              discount={discount}
              exchangesCost={exchangesCost}
              itemsCost={itemsCost}
            />
          </Grid>
          <Grid item xs={6}>
            <InfoDetail
              discount={discount}
              exchangesCost={exchangesCost}
              exchanges={exchanges}/>
          </Grid>
        </Grid>
      }
    </Grid>
  );
};

export default withStyles(styles)(ExchangeInfo);
