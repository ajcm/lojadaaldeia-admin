/* src/App.js */
import { AmplifyAuthenticator, AmplifySignIn } from '@aws-amplify/ui-react';
import React, { Fragment } from 'react';
import theme from '../theme';
 
const CustomAuthenticator = (props) => {

return (

  <Fragment>
    <AmplifyAuthenticator theme={theme}>
    <AmplifySignIn slot="sign-in" 
      usernameAlias="email" 
      headerText="Efectuar login"   
      />
    </AmplifyAuthenticator>
  </Fragment>
  )
}



export default CustomAuthenticator

