import React from 'react';
//import { makeStyles } from '@material-ui/core/styles';
//import { DataGrid } from '@material-ui/data-grid';
//import DeleteIcon from '@material-ui/icons/Delete';
//import Paper from '@material-ui/core/Paper'
import MUIDataTable from "mui-datatables";

function Table(props) {

  const data = props.data;
  const columns = props.columns;
  const options = {
    filterType: 'checkbox',
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 20],
    jumpToPage: true,
    downloadOptions: {
      filename: "online_time_statistics.csv",
      seperator: ",",
    },
    onRowsDelete: props.onAction
  }

  return (
    /* <Paper>
      <div style={{ height: 400, width: '100%' }}>
          <DataGrid delete = {true} rows={props.data} columns={props.columns} pageSize={5} checkboxSelection />
      </div>
    </Paper> */
    <MUIDataTable
      title={props.title}
      data={data}
      columns={columns}
      options={options}
    />
  );
}

export default Table;