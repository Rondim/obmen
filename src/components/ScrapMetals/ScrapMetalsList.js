import React from 'react';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import AddCircleOutline from 'material-ui-icons/AddCircleOutline';
import { withStyles } from 'material-ui/styles';
import { FieldArray } from 'redux-form';

import styles from './styles';
import { METALS } from '../../consts';
import ScrapMetalsListItem from './ScrapMetalsListItem';

const handleAddItem = (fields, defaultValue) => {
  fields.push(defaultValue);
};
const handleDeleteItem = (fields) => (index) => {
  if (fields.length >= 2) fields.remove(index);
};

const renderScrapMetals = ({ fields, classes }) => {
  const defaultValue = { metal: METALS[0].value };
  if (fields.length === 0) fields.push(defaultValue);
  return (
    <Paper className={classes.paper}>
      <div className={classes.header}>Лом</div>
      <div className={classes.scrapMetalsList}>
        <table className={classes.table}>
          <thead className={classes.thead}>
            <tr>
              <td>Масса</td><td>Металл</td><td></td>
            </tr>
          </thead>
          <tbody>
            {fields.map((member, index, fields) => (
              <ScrapMetalsListItem
                key={index}
                index={index}
                member={member}
                onClick={handleDeleteItem(fields)}
              />
            ))}
          </tbody>
        </table>
        <Button
          onClick={() => handleAddItem(fields, defaultValue)}
          className={classes.addButton}>
          <AddCircleOutline className={classes.addButtonIcon} />
        </Button>
      </div>
    </Paper>
  );
};

const ScrapMetalsList = ({ classes }) => {
  return (
    <FieldArray
      name="scrapMetals"
      component={renderScrapMetals}
      classes={classes}
    />
  );
};

export default withStyles(styles)(ScrapMetalsList);
