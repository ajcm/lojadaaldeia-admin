import * as React from 'react';
import {AppContext} from '../context/AppContext'
import SignIn from '../components/SignIn'


export const withAuth =  Component => (props) => {

    const {session, setSession,user,setUser} = React.useContext(AppContext);
  
    if (session){
      return <Component {...props} />
    }else{
      return <SignIn/>
    }
}



const WithAuth =  ({children}) => {

  const {session, setSession,user,setUser} = useContext(AppContext);

  if (session){
    return ({...children})
  }else{
    return <SignIn/>
  }


 
}

  