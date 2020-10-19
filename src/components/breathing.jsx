import React from 'react';
import '../styles/style.css';

//rsuite

//Material UI Theme
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';

//IMG
import imgBreath from '../img/breathing.gif';

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    margin: {
      margin: theme.spacing(1),
    },
    title: {
        color: theme.palette.text.primary,
        fontSize: "24px",
        paddingTop: "10px",
        paddingBottom: "10px",
    },
    text: {
        color: theme.palette.text.primary,
        fontSize: "16px",
        paddingBottom: "10px",
    },
}));


function Breathing(props) {
    const classes = useStyles();

    return (
      <div className = "breathing">
        <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={props.open}
                onClose={props.stop}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={props.open}>
                <div className={classes.paper}>
                    <h2 id="transition-modal-title" className = {classes.title}>Breathing Exercise</h2>
                    
                    <div>
                        <img alt = "Breathing Exercise" style = {{borderRadius: '10%'}} src = {imgBreath}/>
                    </div><br/>

                    <Button variant = "contained" style = {{backgroundColor: 'red', color: 'white'}} onClick = {props.stop}>Exit</Button>
                </div>
                </Fade>
            </Modal>
      </div>
  );
}

export default Breathing;