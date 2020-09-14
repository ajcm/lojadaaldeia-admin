import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { getFromRemote } from '../remote/Utils';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Home </Title>
      <UserWelcome api='users-service' service='test' />

  
    </React.Fragment>
  );
}


 const UserWelcome = ({api,service}) =>  {  
    const [formState, setFormState ] = React.useState()


   React.useEffect(() => {
      getFromRemote('admin','id/details',(error,response) => {
        if(error){
          console.log(error)
          return
        }

        if (response) {
          var state = {}
          const roles = response["cognito:groups"] ? response["cognito:groups"] : '' 

          state['sub'] = response.sub
          state['roles'] = roles ? processRoles(roles) : ''

          setFormState(state)


        }

       
        
      })
    },[])
  
    return (
      <React.Fragment>
        <p>Id <b> {formState ?  formState.sub : ''}</b></p>
        <p>Roles <b> {formState ?  formState.roles : ''}</b></p>
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
   