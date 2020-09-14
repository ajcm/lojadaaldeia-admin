import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import Title from './Title';
import {CognitoUsers} from '../users/UsersComponent'


const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Users() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Users</Title>
      <CognitoUsers/>
    </React.Fragment>
  );
}

