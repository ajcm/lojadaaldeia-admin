import { Grid } from '@material-ui/core/';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import { FullBox } from '../layout/boxes';
import { Link } from "react-router-dom";
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    flexGrow: 1,
    paddingTop: '100px',
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
    <FullBox>
    <Typography variant="body1" gutterBottom>     Logged out ...    </Typography>
     <Link to="/">Click to login</Link>
    </FullBox>
    </Grid>
    </Container> 
  )
}





export default Page;





