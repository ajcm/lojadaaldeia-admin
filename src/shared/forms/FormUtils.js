import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import { format } from 'date-fns';
import React, { Fragment, useContext, useState } from "react";
import Input from '@material-ui/core/Input';
import { TextMaskCustom } from './PostalCodeMask';

export const onlyDigits = (str) => str.replace(/[^0-9]+/g,'')
export const onlyAlpha_lowecase = (str) => (str.replace(/[^a-z0-9]+/g,''))
export const onlyAlpha = (str) => (str.replace(/[^a-zA-Z0-9\-\_\s]+/g,''))
export const isEmpty = (str) => (!str || 0 === str.length);

export const verifyPostal = (arg) => {    
    return !(/^([\d]{4}\-[\d]{3})$/.test(arg))
  }

  export const isNif = (arg) => {    
    return !(arg.length == 9)
  }



export const withFormSupport = Component => (props) => {
    const {formContext,fieldsConfig,load,update} = props
  
    const {formState, setFormState } =  useContext(formContext) 
  
    const [items, setItems] = useState({});  
    const [changed, setChanged] = useState([]);  
  
    function setInput(key, value) {
      setFormState({ ...formState, [key]: value })
  
      if (changed.indexOf(key) < 0)
        setChanged([ ...changed, key ])
  
      console.log('changed',changed)
    }
  
  
  
  
    const getDate= (name) => {
      if (formState && formState[name]) {
  
        console.log("dob",formState[name])
        return format( new Date(formState[name]),'MM/dd/yyyy')
      }
      return "N/A"
    }
  
  
    const getField = (name) => {
      return (formState && formState[name] ? formState[name] : '')
      
    }
  
    const getErrors = (name) => {
      return (items && items[name] ? items[name] : null)
      
    }
  
    const isChanged = (name) => {
      return (changed && changed[name])
      
    }
  

  
    const print = () =>{
  
      console.log(formState)
      console.log(items)
  
    }
  
    const submit = () =>{
      var Fields = {}
      Array.from(changed).forEach(e => Fields[e] = formState[e])
      update(Fields)
    }
  
  
    const validation = () =>{  
      var errors = {}
  
      if (Object.keys(fieldsConfig).length === 0){
        return
      }
  
  
      fieldsConfig.forEach(ff => {
  
        var fieldValue = formState[ff.id]
  
        if (ff.validations){
          ff.validations.forEach(vv => {
            
            if(vv.f(fieldValue)){
              console.log("validation ",ff.id)
              console.log( ff.id,vv.msg)
        
              errors[ff.id] = vv.msg
                   
            }
          })
        }
      })
  
      setItems(errors)

      console.log(errors)
    }
  
    const pp = {getField,getErrors,setInput,isChanged}
    return (
      <Fragment>
      <Component  {...pp} {...props} />
      <Button  style={{marginTop: '10px'}} variant="contained" color="secondary" onClick={()=>load()}>Refresh</Button>
      <Button  style={{marginTop: '10px'}} variant="contained" color="secondary" onClick={()=>validation()}>Validation</Button>
      <Button  style={{marginTop: '10px', marginLeft: '5px'}} variant="contained" color="primary" onClick={()=>submit()}>Update</Button>
      </Fragment>
    );
  }
  
  
export const FormRow = ({label,children}) =>{
  
    return (
    <TableRow>
    <TableCell  scope="row" >
    <p>{label}</p>
    </TableCell>
    <TableCell align="left">
    {children}
    </TableCell>   
    </TableRow>)
  }  
  
  
  
  
const withExtendedInput = Component => (props) =>{
    const {name,get,set,filter,getErrors} = props
  
    const change = (value) => {
      value = filter ? filter(value) : value
      set(name,value)
    }
  
  
    return <Component
    {...props}
    onChange={event => change(event.target.value)}  value={get(name)} error={getErrors(name) != null} helperText={getErrors(name)}  
    />
  }
  
  
  export const TextFieldExtended = withExtendedInput(TextField)

  export const PostalCodeField = (props) => {
    const {name,get,set,filter,getErrors} = props

    const change = (value) => {
     //   value = filter ? filter(value) : value
        set(name,value)
      }

    //   / <Input   value={getField('postal','')}   onChange={event => setInput('postal',event.target.value)}  inputComponent={TextMaskCustom} filter={onlyDigits} />

    return (
        <Fragment>
        <Input  value={get(name,'')}    onChange={event => change(event.target.value)}  error={getErrors(name) != null}  helperText={"ddd"}  inputComponent={TextMaskCustom}/>
        <p class="MuiFormHelperText-root Mui-error" style={{color: 'red'}}>{getErrors(name)}</p>
        </Fragment>
    )


  }

