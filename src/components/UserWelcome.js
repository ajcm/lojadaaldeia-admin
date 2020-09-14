import React, { Fragment, useState } from 'react';



export const UserWelcome = (props) =>  {
  
    const [formState, setFormState ] = useState()
  
    return (
      <Fragment>
        <p>Hello <b> {formState ?  formState.name : ''}</b></p>
        <p>Hello <b> {formState ?  formState.name : ''}</b></p>
      </Fragment>
    );
  }
 

