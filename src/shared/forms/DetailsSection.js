import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import React, { forwardRef, Fragment, useEffect, useImperativeHandle, useRef, useState,createContext, useContext } from "react";
import { postToRemote } from '../remote/Utils';

import {postTo,useRemoteData} from '../remote/RemoteData'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';


export const SharedContext = Component => (props) => {
    const FormContext = createContext();
  
    const SharedComponent = () => {
        const [formState, setFormState] = useState();
        const context = {formState, setFormState};
    
        return (
            <FormContext.Provider value={context}>            
            <Component  {...props} formContext={FormContext} />
            </FormContext.Provider>)
    }

    return (<SharedComponent/> )
}

export const DetailsSection  = ({columns,data}) => {

  const {id,section} = data

  return(

    <TableContainer>
    <Table style={{textAlign: 'left'}}  aria-label="simple table">       
    <TableBody>
    
    <TableRow>
      <TableCell  scope="row" style={{fontWeight:'bold'}}>
      {id}
      </TableCell>
      <TableCell >
       &nbsp; 
      </TableCell>
    </TableRow>

    <DetailsSectionBody fields={columns} data={data} />


    </TableBody> 
    </Table>
    </TableContainer>
  )

}


const DetailsSectionBody = ({fields,data}) => {

  return (
      <Fragment>
        {fields.map(ff => {

          const value =  ff.getValue ? ff.getValue(data[ff.id]) : data[ff.id]

          return (
            <TableRow>
            <TableCell style={{width: '200px',textAlign: 'left'}}>
          {ff.id}
            </TableCell>
            <TableCell>
          {value}
            </TableCell>
            </TableRow>
          )

        })}
        </Fragment>    

  )
}
