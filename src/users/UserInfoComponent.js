import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import React, { createContext, forwardRef, Fragment, useImperativeHandle, useRef, useState } from "react";


import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { ItemsTable } from '../components/tables/Tables';
import { getFromRemote } from '../remote/Utils';


import {getDateToString} from '../commons/utils'


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



  

export const UserInfoComponent =  forwardRef((props, ref) => {
    const classes = useStyles();
    const [formState, setFormState] = useState();
    const context = {formState, setFormState};
    const FormContext = createContext();
  
    useImperativeHandle(ref, () => {
      return {
          setChildren: (obj) =>   setFormState(obj)
    }});
  
    return (
      <Fragment> 
      <Paper className={classes.paper}>
      <FormContext.Provider value={context}>            
        <p>{formState ? formState.Username : ''}</p>
        
      </FormContext.Provider>
      </Paper> 
      </Fragment>
      )
  })
  
  
  
  

  


