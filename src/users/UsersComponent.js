import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import React, { createContext, forwardRef, Fragment, useImperativeHandle, useRef, useState } from "react";


import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { ItemsTable } from '../components/tables/Tables';
import { getFromRemote } from '../remote/Utils';


import {getDateToString} from '../commons/utils'
import {UserInfoComponent} from './UserInfoComponent'


const useStyles = makeStyles({
  root: {
    width: '100%',
  },

  paper: {
    width: "100%",
    flexGrow: 1,
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '10px',
 //   minHeight: '90vh'

  },


  container: {
    maxHeight: 440,
  },

  links: {
    flex:1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'left',
    textAlign: 'left',
  
  },

  
  links2: {
    flex:4,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'left',
    textAlign: 'left'
  },

  links3: {
    display: 'flex',
    flex: 4,
    justifyContent: 'flex-end',
  },
});



const columns = [
    { id: 'Username', label: 'Id', minWidth: 200 },
    { id: 'Attributes', label: 'Email', minWidth: 170, getValue: (field) => (field.find(e => (e.Name === 'email') ).Value) },
    { id: 'Attributes', label: 'Conf.', minWidth: 70, getValue: (field) => (field.find(e => (e.Name === 'email_verified') ).Value) },
    { id: 'Attributes', label: 'Phone', minWidth: 150, getValue: (field) => (field.find(e => (e.Name === 'phone_number') ).Value) },
    { id: 'Attributes', label: 'Conf.', minWidth: 70, getValue: (field) => (field.find(e => (e.Name === 'phone_number_verified') ).Value) },
    { id: 'UserStatus', label: 'Status', minWidth: 100 },
    { id: 'Enabled', label: 'Enabled', minWidth: 70 , getValue: (field) => field + ''  },
   
    { id: 'UserCreateDate', label: 'Created At', minWidth: 170, 'align': 'right', getValue: (field) => getDateToString(field)  },
  ];


  const TableItemsBody = ({columns,edit}) => {

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
            (<TableRow hover role="checkbox" tabIndex={-1} key={row.code} onClick={() => edit(row)}  >
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
  

  
  
  export const CognitoUsers = (props) => {

    const childRef = useRef();
    
    const error = (error) => {  
      console.log(error)

    }

    const edit = (children) => {  
      console.log('edit',children)
      childRef.current.setChildren(children)
  
    }
  

  
    return (
    <Fragment>
      <ItemsTable columns={columns} tableBody={<TableItemsBody columns={columns}  edit={edit} error={error}  />}    />
      <UserInfoComponent api='backoffice' service="users"  ref={childRef}  />
      </Fragment>
    )
  
  }

  




