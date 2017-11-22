import React from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

import styles from './styles';

const Invoice = ({ classes, invoiceData, hasErrors }) => {
  return (
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <div className={classes.heading}>НАКЛАДНАЯ</div>

        {!invoiceData ?
          <Paper className={classes.errorView}>
            <div>Накладная не может быть отображена</div>
          </Paper> :
          <Paper className={classes.invoice}>
            <Table className={classes.table}>
              <TableHead className={classes.thead}>
                <TableRow>
                  <TableCell numeric>Масса</TableCell>
                  <TableCell numeric>Металл</TableCell>
                  <TableCell numeric>Цена за грамм</TableCell>
                  <TableCell numeric>Сумма</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.tbody}>
                {invoiceData.map(({ weight, metal, gramCost, cost }, index) => {
                  return <TableRow key={index}>
                    <TableCell numeric>{weight}</TableCell>
                    <TableCell numeric>{metal}</TableCell>
                    <TableCell numeric>{gramCost}</TableCell>
                    <TableCell numeric>{cost}</TableCell>
                  </TableRow>
                })}
              </TableBody>
            </Table>
          </Paper>
        }
     </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Invoice);
