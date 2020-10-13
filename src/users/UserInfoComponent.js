import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import React, { createContext, forwardRef, Fragment, useImperativeHandle, useState } from "react";
import Button from '@material-ui/core/Button';
import { postTo } from '../remote/Utils';


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
    marginTop: '10px',
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



  

export const UserInfoComponent =  forwardRef((props, ref) => {
    const classes = useStyles();
    const [formState, setFormState] = useState();
    const context = {formState, setFormState};
    const FormContext = createContext();
  
    useImperativeHandle(ref, () => {
      return {
          setChildren: (obj) =>   setFormState(obj)
    }});

    const deleteUser = (username) => {
        //const action = 'deleteUser'
        postTo('admin-api','admin/users/deleteUser',{username},(error, response) => {
            if (error){
                alert(error)
                return
            }

         alert('OK')
        })
    }
  
    return (
    <Fragment> 
        
    {formState ?
      <Paper className={classes.paper}>
      <FormContext.Provider value={context}>            
        <p>Username: {formState ? formState.Username : ''}</p>
        <p>Email: {formState ? formState.Username : ''}</p>
        <Button onClick={() => deleteUser(formState.Username)} color="primary">Delete</Button>
        
      </FormContext.Provider>
      </Paper> 
    : ''}
    </Fragment>
      )
  })
  
  
  
  

  


