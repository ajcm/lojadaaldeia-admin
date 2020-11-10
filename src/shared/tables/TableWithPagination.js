import { Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { Fragment, useContext } from 'react';
import WithPagination from '../../shared/remote/WithPagination';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },

  container: {
    maxHeight: 440,
  },

  links: {
    flex:1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'left',
    textAlign: 'left'
  },

  
  links2: {
    flex:4,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'left',
    textAlign: 'left'
  },

  links3: {
    display: 'flex',
    flex: 4,
    justifyContent: 'flex-end',
  },
});




const TableWithPagination = WithPagination((props) => {

    const {load,loadAll} = props
  
    return (
     
        <Fragment>
        <PageFilter {...props} />
  
        { !loadAll ? 
        (   
        <Fragment> 
          <ItemsTable  {...props} />
          <PageSettings  {...props}  />
        </Fragment>
        )
        : <ItemsTable  {...props} />}
        
  
        </Fragment>
    )
  })


  

  const ItemsTable = ({formContext,columns,edit}) => {
    const classes = useStyles();
  
    const context =  useContext(formContext) 
    const {formState, setFormState,items} = context
  
    

    return (

  
      <TableContainer  style={{textAlign: 'left',backgroundColor: '#f2f2f2'}}>
        <Table size="small" style={{textAlign: 'left'}}  aria-label="simple table">
        <TableHead>

            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>


          </TableHead>

          <TableBody>   
            { items  ?  <TableItemsBody columns={columns} rows={items} edit={edit}/>  :''}
          </TableBody>
        </Table>
      </TableContainer>

    );
  }
  
  const TableItemsBody = ({columns,rows,edit}) => {

    return (
        <Fragment>

          {rows ? (rows.map(row =>
            (<TableRow hover role="checkbox" tabIndex={-1} key={row.code} onClick={() => edit(row)} >
                  {columns.map((column) => {

                    const value =  column.getValue ? column.getValue(row[column.id]) : row[column.id]

                    return (
                      <TableCell key={column.id} align={column.align}>
                       {value}
                      </TableCell>
                    );
                  })}

          </TableRow> ))) : ''}
        </Fragment>    
    )
}



 
  const PageFilter = (props) => {
    const classes = useStyles();
    const {formContext,next,previous,load,reset} = props
   
    const context =  useContext(formContext) 
    const {formState, setFormState } = context
      
    return (

      <Fragment>
      <Container style={{flex:1, textAlign: "right"}}>
      <Button  style={{marginTop: '10px', marginLeft: '5px'}} variant="contained" color="" onClick={() => load()} >Todos</Button> 
      <Button  style={{marginTop: '10px', marginLeft: '5px'}} variant="contained" color=""  onClick={() => reset()} >Reload</Button>

      </Container>
      </Fragment>
    )

  }


  const PageSettings = (props) => {
    const classes = useStyles();
  
    const {formContext,next,previous,load,reset} = props

    const context =  useContext(formContext) 
 
    const {formState,setFormState,items,storage} = context
    const {current,total,last,totalItems} = formState
    

    const getPrevious = () => {

      if (current <= 1)
        return

        previous()
    }

    const getNext = () => {

      if (current == last)
      return

      next()
    }



    return (

      <div>

      <div className={classes.links}>
      <p>Page: {current ? current : 'N/A'} &nbsp;/&nbsp;{formState ? formState.total : 'N/A'}</p>
      <p>&nbsp;(Items per page: {props.pageSize} Counted: {formState.totalItems})</p> 
    

      <div className={classes.links3}>
      <Button  style={{marginTop: '10px', marginLeft: '5px'}} variant="contained" color="primary" disabled={(current <= 1) } onClick={() => getPrevious()} >Back</Button>
      <Button  style={{marginTop: '10px', marginLeft: '5px'}} variant="contained" color="primary" disabled={(last != -1 && current == last) } onClick={() => getNext()} >Next</Button>
      </div>

      </div>
      </div>
    )

  }




export default TableWithPagination