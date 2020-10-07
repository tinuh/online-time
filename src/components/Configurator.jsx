import React from 'react';
import '../styles/style.css';

//components
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/modal";
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

function Configurator(props) {
    const classes = props.useStyles();

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
                    <h2 id="transition-modal-title">Configurator</h2>
                    <p id="transition-modal-description">Protect your eyes and health while using your computer.</p><br/>
                    <Button variant = "contained" color = "primary" onClick = {getStarted}>Get Started</Button>
                </div>
                </Fade>
            </Modal>
            
        </div>
  );
}

export default Configurator;