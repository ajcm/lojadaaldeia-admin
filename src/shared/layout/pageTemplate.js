import { Grid } from '@material-ui/core/';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { FullBox } from './boxes';

const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    flexGrow: 1,
    paddingTop: '10px',
    paddingBottom: '10px',
 //   minHeight: '90vh'

  },


  box: {
    flexGrow: 1,
    paddingTop: '20px',
    paddingBottom: '10px',
 //   minHeight: '90vh',
    padding: theme.spacing(1),
    textAlign: 'center',
    border: '1px',
    margin: 'auto',
    backgroundColor: '',

  },
    root: {
      flexGrow: 1,
      paddingTop: '20px'      
     // minHeight: '90vh',
    },

    field: {
      
      //  paddingTop: '20px',
        marginTop: '10px'
      //  minHeight: '90vh',
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        flexGrow: 1,
    //    minHeight: '85vh',
      //  backgroundColor: 'silver'
      },

  }));



const PageTemplate = (props) => {
  const classes = useStyles();

  return (
    <Container className={classes.container} >
      
    <Grid container spacing={3}>  
   
    <FullBox>
    {props.children}
    </FullBox>

    </Grid>
    </Container> 
  )
}






export default PageTemplate









