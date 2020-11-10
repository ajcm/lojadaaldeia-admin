/* src/App.js */
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { AmplifyAuthenticator } from '@aws-amplify/ui-react';
import { Container } from '@material-ui/core';
import React from 'react';
import { FullBox } from '../layout/boxes';

const WithAuth =  (props) => {
  const {children} = props
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

    React.useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData)
        });
    }, []);

  return authState === AuthState.SignedIn && user ? (     
         {...children}      
    ) : (
    <Container style={{marginTop: '15px'}}>
      <FullBox>
      <Container style={{textAlign: 'center'}}>  
      <AmplifyAuthenticator />
       </Container>
      </FullBox>
    </Container>
  );
}



export default WithAuth



