/* src/App.js */
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Container } from '@material-ui/core';
import React, { Fragment } from 'react';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { FullBox } from '../layout/boxes';
import CustomAuthenticator from './CustomAuthenticator';

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


  // React.useEffect(() => {
  //     return onAuthUIStateChange((nextAuthState, authData) => {

  //       console.log('status changed ', nextAuthState )
  //       changeStatus(nextAuthState)

  //     });
  // }, []);

  
  /*return session.status === AuthState.SignedIn  ? (
    {...children}
  ) : (
    <Container style={{marginTop: '15px'}}>
      <FullBox>
      <Container style={{textAlign: 'center'}}>  
      <CustomAuthenticator />
      </Container>
      </FullBox>
    </Container>

)*/

//  return  (
//     <Container style={{marginTop: '15px'}}>
//       <FullBox>
//       <Container style={{textAlign: 'center'}}>  
//       <CustomAuthenticator />
//       </Container>
//       </FullBox>
//     </Container>)

// }



export default WithAuth



