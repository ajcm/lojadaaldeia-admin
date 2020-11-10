import React, { createContext, useEffect, useState } from 'react';
import { postToRemote } from './Utils';


  

const WithPagination = Component => (props) => {
    const FormContext = createContext();

    const {api, service,loadAll,filter} = props
    const {error} = props

    const pageSize = props.pageSize ?  props.pageSize : 5


  
    const RemoteComponent = () => {
        const [formState, setFormState] = useState({current: 0, total: 0});
        const [items, setItems] = useState([]);  
        const [storage, setStorage] = useState([]);        
        const context = {formState, setFormState,items,setItems,storage};
        
        useEffect(() =>{
            load( loadAll ? null : pageSize)        
    },[]);

           
    const load = (pageSize,reset) => {

        const payload = {
                    body: {}, 
                    headers: {}
          }
                

          payload.body['action'] = 'list'

        if (pageSize){
             payload.body['limit'] =  pageSize;
        }

        if (filter){
          console.log(filter)
          payload.body = {...payload.body,...filter}
        }

        if (formState && formState.lastEvaluatedKey && !reset){
                 payload.body['lastEvaluatedKey'] = formState.lastEvaluatedKey
         }

        getData(payload, reset)
    }


    const getData = (payload,reset) =>{       

      postToRemote(api,service,payload,(err,response) => { 

          if(err){
              console.log(err)   
          }else if (response && response.Items){   

              var current = formState.current && !reset ?   formState.current  : 0                  
              var last = formState.last  && !reset ?   formState.last  : -1
              var totalItems = formState.totalItems && !reset ?   formState.totalItems  : 0


              if (payload.body['limit']) { 
                
                if ( response.Items.length > 1){
               
                  current ++

                  if (!response.LastEvaluatedKey || response.Items.length < pageSize){
                      last = current
                  }

                  totalItems += response.Items.length
                  
                }else{
                  current  ++
                  last = current
                }

              }else{
                  totalItems = response.Items.length;
                  current = last = 1                         
              }

              if (!reset) {
                  setStorage([...storage, ...response.Items]) 
              }else{
                  setStorage(response.Items) 
              }

              setItems(response.Items) 
              setFormState({ ...formState,
                  ['current']: current,
                  ['total']:current,
                  ['last']:last,
                  ['totalItems']:totalItems,
                  ['lastEvaluatedKey']: response.LastEvaluatedKey});
                           
          }else{
              error("No data")
          }
  })
  }



    const previous = () => {

        var current = formState.current

        if (current <= 1)
          return

        current --
        setPageItems(current)
        return

      }

      const next = () => {

        var {current,last,total} = formState

        if (current == last)
          return

        if (current < total){
            current ++
            setPageItems(current)
            return
        }

        load(pageSize)


      }


      const setPageItems = (current) => {

        setFormState({ ...formState,
            ['current']: current,
          });
        

        var ii = storage.slice((current - 1) * pageSize, (current - 1)  * pageSize + pageSize)
        setItems(ii)

      }


      
      const reset = () => {
        load(pageSize,true)
      }


        return (
               <FormContext.Provider value={context}>        
               <Component next={next} previous={previous}  load={load} reset={reset} {...props} formContext={FormContext} />
               </FormContext.Provider>
          )    

    }
    
  
    return (<RemoteComponent/>)
}


  
  export default WithPagination

  