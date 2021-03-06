import React from 'react';
import { CommonLoading } from 'react-loading'
import theme from './theme';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline /> 
   
    <BrowserRouter>            
      <Routes />         
    </BrowserRouter>

    </ThemeProvider>
  );
}


function Routes() {
  return (
  <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/dash" exact component={Dashboard} />
    </Switch>
  )}


export default App;
