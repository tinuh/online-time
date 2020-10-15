import React from 'react';
import '../styles/style.css';

//components
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/modal";
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from '@material-ui/core/styles';

//import ToggleButton from '@material-ui/lab/ToggleButton';
//import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';


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
    },
    textColor: {
        color: theme.palette.text.primary
    },
    text : {
        width: "250px"
    }
  }));

function Configurator(props) {
    const classes = useStyles();

    //Modal Pop Up to get started
    const start = () => {
        props.onAction();
    }

    const close = () => {
        props.setConfigModal(false)
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
                    <h2 className = {classes.title} >Configurator</h2>

                    <div name = "Toggle Buttons" className = {classes.textColor}>
                        <Switch
                            checked={props.enabledState.eye}
                            onChange={() => props.handleEnable('eye')}
                            name="checkedA"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        /> Eye Break Reminders
                        <br/> 
                        <Switch
                            checked={props.enabledState.move}
                            onChange={() => props.handleEnable('move')}
                            name="checkedA"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        /> Move Break Reminders
                        <br/><br/>
                    </div>

                    <TextField variant = "filled" className = {classes.text} InputProps={{endAdornment: <InputAdornment position="end">Min</InputAdornment>}} label = "Eye Break Interval" disabled={props.enabledState.eye ? false : true} value = {props.eyeInterval} onChange = {props.setEyeInterval}></TextField> &nbsp;
                    <TextField variant = "filled" className = {classes.text} InputProps={{endAdornment: <InputAdornment position="end">Sec</InputAdornment>}} label = "Eye Break Duration" disabled={props.enabledState.eye ? false : true} value = {props.eyeTime} onChange = {props.setEyeTime}></TextField> <br/><br/>
                    <TextField variant = "filled" className = {classes.text} InputProps={{endAdornment: <InputAdornment position="end">Min</InputAdornment>}} label = "Move Break Interval" disabled={props.enabledState.move ? false : true} value = {props.moveInterval} onChange = {props.setMoveInterval}></TextField> &nbsp;
                    <TextField variant = "filled" className = {classes.text} InputProps={{endAdornment: <InputAdornment position="end">Min</InputAdornment>}} id="standard-start-adornment" disabled={props.enabledState.move ? false : true}  label = "Move Break Duration" value = {props.moveTime} onChange = {props.setMoveTime}></TextField>
                    
                    <br/><br/><Button variant = "contained" color = "primary" onClick = {start} disabled={props.enabledState.move | props.enabledState.eye ? false : true}>Start</Button> &nbsp;
                    <Button variant = "contained" color = "secondary" onClick = {close}>Close</Button>
                </div>
                </Fade>
            </Modal>
            
        </div>
  );
}

export default Configurator;