import React, { Fragment, useEffect,createContext, useContext,useState} from 'react';

import Button from '@material-ui/core/Button';

import { postTo } from '../../shared/remote/Utils';


  

  
export const withContext = Component => (props) => {
    const FormContext = createContext();

    const {api, service, section,id} = props

    const showReload = false
  
    const RemoteComponent = () => {
        const [formState, setFormState] = useState();
        const context = {formState, setFormState};
        
        useEffect(() => 
        {
            load()        
        },[]);

        const update = (fields) => {  
            
            const action = 'update'
        
            postTo (api,service,{action,id,section,fields}, 
                (error,response) => {
                  
               if(error){
                    console.log('error:',error)      
               }else{      
                    if(response && response.Item){
                        setFormState(response.Item)
                    }           
                }
               }
            )                    
        }


        const load = () => {

            const action = 'get'
        
            postTo (api,service,{action,id,section}, 
                (error,response) => {
                  
               if(error){
                    console.log('error:',error)      
               }else{      
                    if(response && response.Item){
                        setFormState(response.Item)
                    }           
                }
               }
            )
         }

        
            return (
                <FormContext.Provider value={context}>
                { showReload ? <div><Button style={{marginTop: '10px'}} variant="contained"  onClick={() => load()} >RELOAD</Button></div> : '' }
                <Component load={load} update={update}  {...props} formContext={FormContext} />
                </FormContext.Provider>
            )
    
    }


  
    return <RemoteComponent/> 
}


export const withContentItem = Component => (props) => {
    const FormContext = createContext();

    const {api, service,scope,id} = props

    const showReload = false
  
    const RemoteComponent = () => {
        const [formState, setFormState] = useState();
        const context = {formState, setFormState};
        
        useEffect(() => 
        {
       
            load()        
        },[]);

        const update = (fields) => {  
            
            const action = 'update'
        
            postTo (api,service,{action,scope,id,fields}, 
                (error,response) => {
                  
               if(error){
                    console.log('error:',error)      
               }else{      
                    if(response && response.Item){
                        setFormState(response.Item)
                    }           
                }
               }
            )                    
        }


        const load = () => {

            const action = 'get'
            console.log("load **********",api, scope,action,scope,id) 
        
            postTo (api,service,{action,scope,id}, 
                (error,response) => {
                  
               if(error){
                    console.log('error:',error)      
               }else{      
                    if(response && response.Item){
                        setFormState(response.Item)
                    }           
                }
               }
            )
         }

        
            return (
                <FormContext.Provider value={context}>
                { showReload ? <div><Button style={{marginTop: '10px'}} variant="contained"  onClick={() => load()} >RELOAD</Button></div> : '' }
                <Component load={load} update={update}  {...props} formContext={FormContext} />
                </FormContext.Provider>
            )
    
    }


  
    return <RemoteComponent/> 
}




  
  export default withContext


  