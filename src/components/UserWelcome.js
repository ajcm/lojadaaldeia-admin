import React, { Fragment, useState } from 'react';
import useSWR from 'swr'
import { API  } from 'aws-amplify';
import { AppContext } from '../context/AppContext';

const UserWelcome = ({api,service}) =>  {  
  const {session,setSession,user,setUser,menuOpen, setMenuOpen} = React.useContext(AppContext);

  const { data, error } = useSWR('identity', (props) => getRemote(api,'identity') )

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  //return <div>hello {menuOpen+''}!</div>

 
    return (
     <React.Fragment>
        <p>Id: {data.sub}</p>
        <p>Roles: {data.roles}</p>
      </React.Fragment>
    );
 }



const processRoles =  (data) => {
   if (data){
     return data.join()
 
   }else{
     return 'n/a'
   }
}




export const getRemote = async  (api,service) =>{
  return await API.get(api, service, {})  
}

//  if (response) {
//   var state = {}
//   const roles = response["cognito:groups"] ? response["cognito:groups"] : '' 

//   state['sub'] = response.sub
//   state['roles'] = roles ? processRoles(roles) : ''

//   setFormState(state)
// }               
// })

export default UserWelcome