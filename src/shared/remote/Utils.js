import { API  } from 'aws-amplify';

export const getFromRemote = (api,section,callback) =>{
    API.get(api, section, {})
    .then(response => callback(null,response))
    .catch(error => callback(error)) 
}
  
  
export const postToRemote = (api,section,data,callback) =>{
    API.post(api, section,data,{})
    .then(response => callback ? callback(null,response) : '' )
    .catch(error => callback ? callback(error) : '') 
}

export const postTo = (api,service,data,callback) => {
  const payload = {
      body: data, 
      headers: {}
  }
  
  postToRemote(api,service,payload,callback)
}



export const post =  (api,service,data) => {
    const payload = {
        body: data, 
        headers: {}
    }
    
   return  API.post(api,service,payload)
}
  
