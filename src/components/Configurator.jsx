import React from 'react';
import '../styles/style.css';

//components
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/modal";
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from "@material-ui/core/TextField"

function Configurator(props) {
    const classes = props.useStyles();

    //Modal Pop Up to get started
    const close = () => {
        props.onAction();
    }

    const more = () => {
        alert("In Construction")
    }

    return (
        <div className="Home">
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={props.open}
                onClose={close}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={props.open}>
                <div className={classes.paper}>
                    <h2 id="transition-modal-title">Configurator</h2>
                    <TextField variant = "outlined" label = "Eye Break Interval (Minutes)" value = {props.eyeInterval} onChange = {props.setEyeInterval}></TextField> &nbsp;
                    <TextField variant = "outlined" label = "Eye Break Duration (Seconds)" value = {props.eyeTime} onChange = {props.setEyeTime}></TextField>
                    <br/><br/><Button variant = "contained" color = "primary" onClick = {close}>Start</Button> &nbsp;
                    <Button variant = "contained" color = "secondary" onClick = {more}>Learn More</Button>
                </div>
                </Fade>
            </Modal>
            
        </div>
  );
}

export default Configurator;