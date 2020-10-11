import React from 'react';
import '../styles/style.css';

//Import images
import Icon from "../img/icon.png";

//Countdown Package
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

//React Router
import {useHistory} from "react-router-dom";

//Material UI
import { makeStyles } from '@material-ui/core/styles';

//Componenets
import GetStarted from "./GetStarted";
import Configurator from "./Configurator";
import Navbar from "./Navbar";

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
    title : {
        color: theme.palette.text.primary,
        marginRight: "25%",
        textAlign: "center",
    }
  }));

function Home() {
    const classes = useStyles();
    const history = useHistory();

    var firstTime = true;
    var config = undefined;
    var page = '0';

    //Get Local Storage Values
    if (JSON.parse(localStorage.getItem('config')) !== null && Notification.permission === "granted"){
        firstTime = false;
        config = JSON.parse(localStorage.getItem('config'))
    }

    //Check path
    let path = window.location.pathname;
    if (path === "/dashboard"){
        page = '1';
    }
    else if (path === "/stats"){
        page = '2';
    }
    else if (path === "/config"){
        page = '3';
    }
    
    
    //states
    const [openingModal, setOpeningModal] = React.useState(page !== "3" ? firstTime: false);
    const [configModal, setConfigModal] = React.useState(page === "3" ? true : !firstTime);
    const [countdownEye, setCountdownEye] = React.useState(false);
    const [countdownMove, setCountdownMove] = React.useState(false);
    const [eyeTime, setEyeTimeState] = React.useState(!firstTime ? config.eyeTime : 20);
    const [eyeInterval, setEyeIntervalState] = React.useState(!firstTime ? config.eyeInterval : 20);
    const [moveTime, setMoveTimeState] = React.useState(!firstTime ? config.moveTime : 5);
    const [moveInterval, setMoveIntervalState] = React.useState(!firstTime ? config.moveInterval : 60);
    const [enabled, setEnabledState] = React.useState({'eye': true, 'move': true});
    const [nav, setNav] = React.useState(page);
    var notificationEye;
    var notificationMove;

    //state functions
    const setEyeTime = (e) => {
        setEyeTimeState(e.target.value);
    }
    const setEyeInterval = (e) => {
        setEyeIntervalState(e.target.value);
    }
    const setMoveTime = (e) => {
        setMoveTimeState(e.target.value);
    }
    const setMoveInterval = (e) => {
        setMoveIntervalState(e.target.value);
    }
    const setEnabled = (event, newEnable) => {
        setEnabledState(newEnable);
    }
    const handleEnabled = (type) => {
        if (type === 'eye'){
            setEnabledState({'eye': !enabled.eye, 'move': enabled.move})
        }
        else {
            setEnabledState({'eye': enabled.eye, 'move': !enabled.move})
        }
    }

    //Before Unload
    window.addEventListener('beforeunload', (event) => {
        // Cancel the event as stated by the standard.
        event.preventDefault();
        // Chrome requires returnValue to be set.
        event.returnValue = '';
        //alert("Bye");
        
        config = {'eyeTime': eyeTime, 'eyeInterval': eyeInterval, 'moveTime': moveTime, 'moveInterval': moveInterval}
        localStorage.setItem('config', JSON.stringify(config));
    });

    //Push Notification Function
    const PushNotification = (msg, des, OnClick=null) => {
        var notifi = new Notification(msg, {body: des, icon: Icon});
        notifi.onclick = function(event) {
            window.focus()
            if (OnClick !== null){
                OnClick();
            }
        }
    }

    //Get Started Pop-up
    const getStarted = () => {
        setOpeningModal(false);
        setConfigModal(true);
        history.push("/config")
    }

    //To Start
    const startScreen = () => {
        if (!enabled.eye && !enabled.move){
            setConfigModal(false);
        }
        else if (Notification.permission === "granted"){
            setConfigModal(false);
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

    //Eye Countdown
    const startEye = () => {
        clearTimeout(notificationEye);
        notificationEye = setTimeout(() => PushNotification("Time to Look Away", "Click to start timer", () => startCountdown('eye')), eyeInterval * 60000)
    }

    //Move Countdown
    const startMove = () => {
        clearTimeout(notificationMove);
        notificationMove = setTimeout(() => PushNotification("Time to Move", "Click to start timer", () => startCountdown('move')), moveInterval * 60000)
    }


    //Countdown Functions
    const startCountdown = (type) => {
        if (type === "eye"){
            setCountdownEye(true);
        }
        else if (type === "move"){
            setCountdownMove(true)
        }
    }

    const stopCountdown = (type) => {
        if (type === "eye"){
            setCountdownEye(false);
            startEye();
        }
        else if (type === "move"){
            setCountdownMove(false);
            startMove();
        }   
    }

    //Actually Start
    const start = () => {
        if (enabled.eye){
            startEye();
        }
        if (enabled.move){
            startMove();
        }
    }

    return (
        <div className="Home">
            <div className = "row">
                <div className = "col-md-4 nav-div">
                    <Navbar page = {nav} setNav = {setNav}/>
                </div>

                <div className = "col-md-8">

                    <div style = {window.location.pathname !== "/dashboard" ? {display: "none"} : {display: "block"}}>
                        <h2 className = {classes.title}>Dashboard</h2>
                            {countdownEye && <CountdownCircleTimer
                            isPlaying
                            duration={eyeTime}
                            className = {classes.textColor}
                            colors={[
                            ['#004777', 0.33],
                            ['#F7B801', 0.33],
                            ['#A30000', 0.33],
                            ]}
                        >
                            {({ remainingTime }) => remainingTime !== 0 ? <h1>{remainingTime}</h1> : stopCountdown("eye")}
                        </CountdownCircleTimer>}

                        {countdownMove && <CountdownCircleTimer
                            isPlaying
                            duration={moveTime * 60}
                            colors={[
                            ['#004777', 0.33],
                            ['#F7B801', 0.33],
                            ['#A30000', 0.33],
                            ]}
                        >
                            {({ remainingTime }) => remainingTime !== 0 ? <h1>{Math.ceil(remainingTime/60)}</h1> : stopCountdown("move")}
                        </CountdownCircleTimer>}
                    </div>

                    <div style = {window.location.pathname !== "/stats" ? {display: "none"} : {display: "block"}}>
                        <h2 className = {classes.title}>Statistics</h2>
                    </div>


                    <div style = {window.location.pathname !== "/config" ? {display: "none"} : {display: "block"}}>
                        <h2 className = {classes.title}>Configuration</h2>
                    </div>

                   
                </div>
            </div>
            
            <GetStarted open = {openingModal} useStyles={useStyles} onAction = {getStarted}/>
            <Configurator 
                open = {configModal} 
                useStyles={useStyles} 
                onAction={startScreen}
                setEyeInterval = {setEyeInterval} 
                eyeInterval = {eyeInterval}
                setEyeTime = {setEyeTime}
                eyeTime = {eyeTime}
                moveTime = {moveTime}
                setMoveTime = {setMoveTime}
                moveInterval = {moveInterval}
                setMoveInterval={setMoveInterval}
                enabledState = {enabled}
                setEnabledState = {setEnabled}
                handleEnable = {handleEnabled}
            />
            
        </div>
  );
}

export default Home;