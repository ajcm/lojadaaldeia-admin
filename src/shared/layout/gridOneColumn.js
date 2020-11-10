import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Hidden from '@material-ui/core/Hidden'
import { makeStyles } from '@material-ui/core/styles'
import withWidth from '@material-ui/core/withWidth'
import PropTypes from 'prop-types'
import React from 'react'



const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    flexGrow: 1,
  //  paddingTop: '10px',
  //  paddingBottom: '10px',
    minHeight: '90vh',
//    padding: theme.spacing(2),
    textAlign: 'left',
   // margin: 'auto',
  //  backgroundColor: 'silver'

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

  


const GridOneColumn = (props) => {
  const classes = useStyles();
  const { left, right, children } = props;
  

  return (    
    <Container className={classes.container} >
    <Grid container spacing={1}>        
     <Box className={classes.box}>
      {children}
     </Box>
    
    </Grid>
    </Container>

  );

}

GridOneColumn.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default withWidth() ( GridOneColumn)



