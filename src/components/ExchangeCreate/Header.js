import React from 'react';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';

import styles from './styles';

const Header = ({ classes }) => {
  return (<Grid container spacing={8}>
    <Grid item xs={12}>
      <h3 className={classes.header}>ОБМЕН</h3>
    </Grid>
  </Grid>);
};

export default withStyles(styles)(Header);
