import React from 'react';
import '../styles/style.css';

//Countdown Package
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

//Material UI
import { makeStyles } from '@material-ui/core/styles';
//import Button from "@material-ui/core/Button";

//Componenets
import GetStarted from "./GetStarted";

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

    //states
    const [openingModal, setOpeningModal] = React.useState(true);
    const [countdown, setCountdown] = React.useState(false);
    const [eyeTime, setEyeTime] = React.useState(20);
    const [eyeInterval, setEyeInterval] = React.useState(5000);
    const [moveTime, setMoveTime] = React.useState(60);
    const [moveInterval, setMoveInterval] = React.useState(60);

    //Push Notification Function
    const PushNotification = (msg, des, OnClick=null) => {
        var notification = new Notification(msg, {body: des});
        notification.onclick = function(event) {
            window.focus()
            if (OnClick != null){
                OnClick();
            }
        }
    }

    //Get Started
    const startScreen = () => {
        if (Notification.permission === "granted"){
            setOpeningModal(false);
            start();
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
        start();
    }

    //Actually Start
    const start = () => {
        var notifcation = setTimeout(() => PushNotification("Time to take a Break", "Look Away, Click for more info", startCountdown), eyeInterval)
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
                {({ remainingTime }) => remainingTime != 0 ? remainingTime : stopCountdown()}
            </CountdownCircleTimer>}
            
            <GetStarted open = {openingModal} useStyles={useStyles} onAction = {startScreen}/>
            
        </div>
  );
}

export default Home;