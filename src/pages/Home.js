import { Grid } from '@material-ui/core/';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';

import { FullBox } from '../layout/boxes';



const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    flexGrow: 1,
    paddingTop: '10px',
    paddingBottom: '10px',
    minHeight: '60vh'

  },

  box:  {
    flexGrow: 1,
    float: 'left',
    padding: '0px',
    textAlign: 'left',
  },

  labels: {
    fontSize: '0.75rem',
  }
}));

const Page = () => {
  const classes = useStyles();
  
  return (
    <Container className={classes.container} >
    <Grid container spacing={3}>  
    <GetContent/>
    </Grid>
    </Container> 
  )
}


const GetContent = () => {
  const classes = useStyles();
  return (
    <Fragment>
    <FullBox>
    <Typography variant="h4" gutterBottom>
       Home page
      </Typography>
    </FullBox>
    </Fragment>)

}



export default Page





