import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import Amplify, { Auth } from "aws-amplify";
import React, { useState } from 'react';
import { CommonLoading } from 'react-loading';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AppContext } from '../src/context/AppContext';
import WithAuth from './auth/WithAuth';
import Home from './pages/Home';
import Orders from './pages/Orders';
import Template from './pages/Template';
import Users from './pages/Users';
import theme from './theme';


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
  

  /*

  "aws_project_region": "eu-west-1",
    "aws_cognito_identity_pool_id": "eu-west-1:f78d17ff-a118-4bef-afb7-fbecd8683e34",
    "aws_cognito_region": "eu-west-1",
    "aws_user_pools_id": "eu-west-1_hDu682t9h",
    "aws_user_pools_web_client_id": "329fi5m2bpu49pbt192he7144a",*/

Amplify.configure({
  
  Auth: {
      region: 'eu-west-1', 
      userPoolId: "eu-west-1_hDu682t9h",
      userPoolWebClientId: '329fi5m2bpu49pbt192he7144a',
  },
  API: {
      endpoints: [
        
        {
          name: "admin-api",
          endpoint: "https://api.lojadaaldeia.pt/admin/",          
         // endpoint: 'http://192.168.1.6:8080/',        
          custom_header: async () => {         
             return { Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}` }
          }
        },    
       
  ]
  }
});


export default App