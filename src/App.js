import React, { useState } from 'react';
import { CommonLoading } from 'react-loading'
import theme from './theme';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom'
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { AppContext } from '../src/context/AppContext';
import {  Auth  } from 'aws-amplify';

import Template from './pages/Template'

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Orders from './pages/Orders'

import WithAuth from './auth/WithAuth'

//Amplify.configure(awsExports);


const App = (props) => {

  const [session, setSession] = useState();
  const [user, setUser] = useState();


  if (props.isLoading) {
    return <CommonLoading />;
} else {
  return (
    <AppContext.Provider value={{session,setSession,user,setUser}}>
    <ThemeProvider theme={theme}>
    <CssBaseline />        
    <WithAuth>
    <BrowserRouter>            
      <Routes />         
    </BrowserRouter>
    </WithAuth>
    </ThemeProvider>
     </AppContext.Provider>
  );
}
}


const Routes = () => {
  return (
  <Switch>
     <Route path="/" exact >
        <Template><Home/></Template>
      </Route>

      <Route path="/users" exact >
        <Template><Users/></Template>
      </Route>
      
      <Route path="/orders" exact >
        <Template><Orders/></Template>
      </Route>

      <Route path="/providers" exact >
        <Template><Orders/></Template>
      </Route>


    </Switch>
  )}
  


Amplify.configure({
  
  Auth: {
      identityPoolId: "eu-west-1:a641ea8c-2711-4969-99f4-e7b580ec37ce",
      region: 'eu-west-1', 
      userPoolId: "eu-west-1_T2DookXqW",
      userPoolWebClientId: '4ce0bdreaco1fqqdbndkmrq8jf',
  },
  API: {
      endpoints: [
        
        {
          name: "users",
          endpoint: "https://734cvipkkh.execute-api.eu-west-1.amazonaws.com/Prod/",          
          custom_header: async () => {         
             return { Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}` }
          }
        },
        {
          name: "admin",
          endpoint: "https://w41xifld4j.execute-api.eu-west-1.amazonaws.com/Prod/",          
          custom_header: async () => {         
             return { Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}` }
          }
        },
       
  ]
  }
});


export default App