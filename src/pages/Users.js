import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import Title from './Title';

import {ItemsTable} from '../components/tables/Tables'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { getFromRemote } from '../remote/Utils';

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


export const TableItemsBody_ = ({columns,rows,edit}) => {

  return (
      <React.Fragment>

        {rows ? (rows.map(row =>
          (<TableRow hover role="checkbox" tabIndex={-1} key={row.code} onClick={() => edit(row)} >
                {columns.map((column) => {

                  const value =  column.getValue ? column.getValue(row[column.id]) : row[column.id]

                  return (
                    <TableCell key={column.id} align={column.align}>
                     {value}
                    </TableCell>
                  );
                })}

        </TableRow> ))) : ''}
      </React.Fragment>    
  )
}

export const TableItemsBody = ({columns}) => {

  const [formState, setFormState ] = React.useState()

  React.useEffect(() => {
     getFromRemote('admin','users/cognitoUsers',(error,response) => {
       if(error){
         console.log(error)
         return
       }

       if (response ) {
         setFormState(response)
       }               
     })
   },[])



  return (
    <React.Fragment>    
      {formState && formState.Users ? (formState.Users.map(row =>
          (<TableRow hover role="checkbox" tabIndex={-1} key={row.code}  >
                {columns.map((column) => {

                  const value =  column.getValue ? column.getValue(row[column.id]) : row[column.id]

                  return (
                    <TableCell key={column.id} align={column.align}>
                     {value}
                    </TableCell>
                  );
                })}

        </TableRow> ))) : ''}
      </React.Fragment>    
  )
}



const CognitoUsers = (props) => {

  const columns = [
    { id: 'Username', label: 'Id', minWidth: 200 },
    { id: 'Attributes', label: 'Email', minWidth: 170, getValue: (field) => (field['email']) },
    { id: 'phone', label: 'Phone', minWidth: 170 },
    { id: 'UserStatus', label: 'Status', minWidth: 170 },
   
    { id: 'UserCreateDate', label: 'Created At', minWidth: 170, 'align': 'right' },
  ];


  return (<ItemsTable columns={columns} tableBody={<TableItemsBody columns={columns}  />}/>)


}
