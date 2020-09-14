import { API  } from 'aws-amplify';

export const getFromRemote = (api,service,callback) =>{
    API.get(api, service, {})
    .then(response => callback(null,response))
    .catch(error => callback(error)) 
}
  
  
const postToRemote = (api,service,data,callback) =>{
    API.post(api, service,data,{})
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
  
