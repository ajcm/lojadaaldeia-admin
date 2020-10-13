import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import React, { createContext, forwardRef, Fragment, useImperativeHandle, useState, useRef } from "react";
import { getDateToString } from '../commons/utils';
import { ItemsTable } from '../components/tables/Tables';
import { getFromRemote } from '../remote/Utils';
import { UserInfoComponent } from './UserInfoComponent';
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';

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


  const TableItemsBody = forwardRef(({columns,edit}, ref) => {

    const [formState, setFormState ] = React.useState()
    const [selected, setSelected ] = React.useState()


    useImperativeHandle(ref, () => {
      return {
          reload: () =>   load()
    }});

  
    React.useEffect(() => {
      load()
     },[])

     const load = () =>{
      getFromRemote('admin-api','admin/users/cognitoUsers',(error,response) => {
        if(error){
          console.log(error)
          return
        }
 
        if (response ) {
          setFormState(response)
        }               
      })

     }
  
     const onClick = (user) =>{  
      setSelected(user.Username)
      edit(user)
     } 

     const getBackground = (username) =>{
       return  username === selected ? 'darkgray' : 'white'
     } 
  

    return (
      <React.Fragment>    
        {formState && formState.Users ? (formState.Users.map(row =>
            (<TableRow hover role="checkbox" tabIndex={-1} key={row.code} onClick={() => onClick(row)} style={{backgroundColor:getBackground(row.Username)}}  >
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
  })
  

  
  
  export const CognitoUsers = (props) => {

    const childRef = useRef();
    const tabledRef = useRef();
    
    const error = (error) => {  
      console.log(error)
    }

    const edit = (children) => {  
      console.log('edit',children)
      childRef.current.setChildren(children)
    }
  
    const reload = (children) => {  
      console.log('edit',children)
      tabledRef.current.reload()
  
    }

  
    return (
    <Fragment>
      <Paper>
      <Fragment>
      <Container style={{flex:1, textAlign: "right"}}>

      <Button  style={{marginTop: '10px', marginLeft: '5px'}}  color="primary"  onClick={() => reload()} >Reload</Button>

      </Container>
      </Fragment>

      <ItemsTable columns={columns} tableBody={<TableItemsBody columns={columns} edit={edit} error={error} ref={tabledRef}  />}    />
      </Paper>
      <UserInfoComponent ref={childRef}  />
      </Fragment>
    )
  
  }

  




