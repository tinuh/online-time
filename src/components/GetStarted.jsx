import React from 'react';
import '../styles/style.css';

//components
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/modal";
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { makeStyles } from '@material-ui/core/styles';

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


function GetStarted(props) {
    const classes = useStyles();

    //Modal Pop Up to get started
    const getStarted = () => {
        props.onAction();
    }

    return (
        <div className="Home">
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={props.open}
                onClose={getStarted}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={props.open}>
                <div className={classes.paper}>
                    <h2 id="transition-modal-title" className = {classes.title}>Welcome to Online Time</h2>
                    <p id="transition-modal-description" className = {classes.text}>Protect your eyes and health while using your computer.</p><br/>
                    <Button variant = "contained" color = "primary" onClick = {getStarted}>Get Started</Button>
                </div>
                </Fade>
            </Modal>
            
        </div>
  );
}

export default GetStarted;