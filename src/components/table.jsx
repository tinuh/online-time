import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Table as MTable} from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Table(props) {
  const classes = useStyles();

  const rows = props.data

  return (
    <TableContainer component={Paper}>
      <MTable className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Duration of Work</TableCell>
            <TableCell align="right">Eye Breaks</TableCell>
            <TableCell align="right">Move Breaks</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">{row.date}</TableCell>
              <TableCell align="right">{row.duration}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
              <TableCell align="center">
                  <Tooltip title = "Delete Record">
                    <IconButton style = {{padding: "none"}}>
                        <DeleteIcon/>
                    </IconButton>
                  </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MTable>
    </TableContainer>
  );
}

export default Table;