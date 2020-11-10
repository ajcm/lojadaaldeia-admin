import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { postTo } from '../shared/remote/Utils';
import EditIcon from '@material-ui/icons/Edit';

const columns = [
  { id: 'metadata', label: 'Id', minWidth: 170,
    format: (value) => (value.id)
    },
  { id: 'metadata', label: 'Owner', minWidth: 100,
    format: (value) => (value.owner) },
 
];




const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  icon : {
    width: 15,
    height: 15,  
  }
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


  const [items] = usePagination('CMS-API','cms/list/PAGE')

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table  size="small" stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
               <TableCell>
                Edit
               </TableCell>
            </TableRow>
            
          </TableHead>
          <TableBody>
            {items ? items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && value? column.format(value) : value}
                      </TableCell>
                    );
                  })}

                    <TableCell>
                    <EditIcon fontSize='small'  className={classes.icon}/>
                   </TableCell>
                </TableRow>
              );
            }): ''}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={items.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}


const usePagination = (api,service) => {
    const [items, setItems] = useState([]); 

    useEffect(() =>{
            load()        
    },[])


    const load =  () => {
        postTo (api,service,{}, (error,response) => {
              if(error){
                console.log('error:',error)     
                setItems([]) 
              }else if(response){
                console.log('response:',response)  
                setItems(response)
            }           
        })

    }

    return [items]
}



