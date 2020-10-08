import React from 'react';
import '../styles/style.css';

//Import images
import Icon from "../img/icon.png";

//Countdown Package
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

//Material UI
import { makeStyles } from '@material-ui/core/styles';
//import Button from "@material-ui/core/Button";

//Componenets
import GetStarted from "./GetStarted";
import Configurator from "./Configurator";

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
}));

function Home() {
    const classes = useStyles();

    //Get Local Storage Values
    let firstTime = true;
    let config = undefined;
    if (JSON.parse(localStorage.getItem('config')) !== null){
        firstTime = false;
        config = JSON.parse(localStorage.getItem('config'))
        console.log(config);
    }

    //states
    const [openingModal, setOpeningModal] = React.useState(firstTime);
    const [configModal, setConfigModal] = React.useState(!firstTime);
    const [countdown, setCountdown] = React.useState(false);
    const [eyeTime, setEyeTimeState] = React.useState(!firstTime ? config.eyeTime : 20);
    const [eyeInterval, setEyeIntervalState] = React.useState(!firstTime ? config.eyeInterval : 20);
    const [moveTime, setMoveTime] = React.useState(60);
    const [moveInterval, setMoveInterval] = React.useState(3600000);
    var notifcation;

    //Before Unload
    window.addEventListener('beforeunload', (event) => {
        // Cancel the event as stated by the standard.
        event.preventDefault();
        // Chrome requires returnValue to be set.
        event.returnValue = '';
        alert("Bye");
        
        config = {'eyeTime': eyeTime, 'eyeInterval': eyeInterval, 'moveTime': moveTime, 'moveInterval': moveInterval}
        localStorage.setItem('config', JSON.stringify(config));
    });

    //state functions
    const setEyeTime = (e) => {
        setEyeTimeState(e.target.value);
    }
    const setEyeInterval = (e) => {
        setEyeIntervalState(e.target.value);
    }

    //Push Notification Function
    const PushNotification = (msg, des, OnClick=null) => {
        var notification = new Notification(msg, {body: des, icon: Icon});
        notification.onclick = function(event) {
            window.focus()
            if (OnClick !== null){
                OnClick();
            }
        }
    }

    //Get Started
    const startScreen = () => {
        if (Notification.permission === "granted"){
            setOpeningModal(false);
            setConfigModal(true);
        }
        else if (Notification.permission === "denied"){
            alert("Please enable Notifications to proceed further")
        }
        else{
            Notification.requestPermission();
            startScreen();
        }
        
    }

    //Countdown Functions
    const startCountdown = () => {
        setCountdown(true);
    }

    const stopCountdown = () => {
        setCountdown(false);
        notifcation = setTimeout(() => PushNotification("Time to take a Break", "Look Away, Click for more info", startCountdown), eyeInterval * 60000)
    }

    //Actually Start
    const start = () => {
        setConfigModal(false);
        notifcation = setTimeout(() => PushNotification("Time to take a Break", "Look Away, Click for more info", startCountdown), eyeInterval * 60000)
    }

    return (
        <div className="Home">
            {countdown && <CountdownCircleTimer
                isPlaying
                duration={eyeTime}
                colors={[
                ['#004777', 0.33],
                ['#F7B801', 0.33],
                ['#A30000', 0.33],
                ]}
            >
                {({ remainingTime }) => remainingTime !== 0 ? <h1>{remainingTime}</h1> : stopCountdown()}
            </CountdownCircleTimer>}
            
            <GetStarted open = {openingModal} useStyles={useStyles} onAction = {startScreen}/>
            <Configurator open = {configModal} useStyles={useStyles} onAction={start} setEyeInterval = {setEyeInterval} eyeInterval = {eyeInterval} setEyeTime = {setEyeTime} eyeTime = {eyeTime}/>
            
        </div>
  );
}

export default Home;