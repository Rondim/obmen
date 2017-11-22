import React from 'react';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

import styles from './styles';

const InfoDiagram = ({ classes, discount, exchanges, exchangesCost }) => {
  const discountSum = discount + exchangesCost;
  return (
    <Paper className={classes.infoBlockDetail}>
        {exchanges.map(({ weight, gCost }, index) => {
          return (
            <div
              key={index}>
              {`${Math.round(weight*100)/100}г по цене ${gCost} руб`}
            </div>)
          ;
        })}
        <div>
          {discount !==0 && `скидка ${discount} руб`}
        </div>
        <hr/>
        <div>
          {`${discountSum} руб`}
        </div>
    </Paper>
  );
};

export default withStyles(styles)(InfoDiagram);
