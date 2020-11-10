import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import Title from './Title';
import CmsTabs from '../cms/CmsTabs'

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}


function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CmsTabs/>
    </React.Fragment>
  );
}
