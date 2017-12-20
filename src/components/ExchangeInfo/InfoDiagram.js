import React from 'react';
import Paper from 'material-ui/Paper';
import SquareIcon from 'material-ui-icons/Stop';
import { withStyles } from 'material-ui/styles';

import styles from './styles';

const InfoDiagram = ({ classes, discount, exchangesCost, itemsCost }) => {
  const remainder = itemsCost - discount - exchangesCost;
  const remainderShare = remainder > 0 ? remainder / itemsCost : 0;

  return (
    <div>
      <Paper className={classes.infoBlockDiagram}>
        <div className={classes.diagramSum}>{itemsCost}</div>
        <div className={classes.diagram}>
          <div
            className={classes.diagramDiscount}
            style={{ width: `${(1-remainderShare)*100}%` }} />
          <div
            className={classes.diagramRemainder}
            style={{ width: `${remainderShare*100}%` }} />
        </div>
        <div className={classes.diagramInfo}>
          <div className={classes.discountText}>
            <SquareIcon/>
              <span>
                {
                  discount === 0 ?
                  `${exchangesCost} руб - обмен` :
                  `${exchangesCost + discount} руб - скидка/обмен`
                }
              </span>
          </div>
          <div className={classes.remainderText}>
            <SquareIcon/>
              <span>
                {remainder >= 0 ?
                  `${remainder} руб - доплата` :
                  `${Math.abs(remainder)} руб - мы выплачиваем`}
              </span>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(InfoDiagram);
