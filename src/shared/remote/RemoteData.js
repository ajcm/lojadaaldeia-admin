import React, { useEffect, useState } from "react";
import { postTo } from './Utils';



  export const useRemote = (api,service,payload) =>{

    const [data, setData] = useState({});

    useEffect(() => {
    
      load()
    },[])


    const load = () => {
      console.log('load:',payload)    

        postTo (api,service,payload,(error,response) => {          
            if(error){
              console.log('error:',error)      
            }else{                    
                setData(response)                         
          }
          }
        )
        
      }

     
    return [data,setData,load]
  }


