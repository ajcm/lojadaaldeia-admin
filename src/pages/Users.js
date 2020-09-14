import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import Title from './Title';

import {ItemsTable} from '../components/tables/Tables'



const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Users</Title>
      <CognitoUsers/>
    </React.Fragment>
  );
}


const CognitoUsers = (props) => {

  const columns = [
    { id: 'id', label: 'Id', minWidth: 170 },
    { id: 'name', label: 'Nome', minWidth: 170 },
    { id: 'site', label: 'Site', minWidth: 170 },
    { id: 'status', label: 'Status', minWidth: 170, 'align': 'right' },
  ];


  return (<ItemsTable columns={columns}/>)


}
