import React from 'react';
import '../styles/style.css';

//Import images
import Icon from "../img/icon.png";

//Countdown Package
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

//React Router
import {withRouter} from "react-router-dom";

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

//Componenets
import GetStarted from "./GetStarted";
import Configurator from "./Configurator";
import Navbar from "./Navbar";
import { CardActionArea } from '@material-ui/core';
import Table from "./table.jsx";

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
        color: "white",
        textAlign: "center",
    },
    text : {
        color: theme.palette.text.primary,
    },
    cardContent : {
        textAlign: "center",
    }
  }));

class Home extends React.Component {
    constructor(props) {
        super();

        this.state = {
            openingModal: false,
            configModal: false,

            data: [],

            countdownEye: false,
            countdownMove: false,
            countdownEyeInterval: false,
            countdownMoveInterval: false,

            eyeTime: 20,
            eyeInterval: 20,
            moveTime: 5,
            moveInterval: 60,
            enabled: {'eye': true, 'move': true},

            nav: "0",
            active: false,
            eyeTimeout: null,
            moveTimeout: null,
        }

        this.setEyeTime = this.setEyeTime.bind(this);
        this.setEyeInterval = this.setEyeInterval.bind(this);
        this.setMoveTime = this.setMoveTime.bind(this);
        this.setMoveInterval = this.setMoveInterval.bind(this);
        this.setNav = this.setNav.bind(this);
        this.handleEnabled = this.handleEnabled.bind(this);
        this.PushNotification = this.PushNotification.bind(this);
        this.getStarted = this.getStarted.bind(this);
        this.startScreen = this.startScreen.bind(this);
        this.startEye = this.startEye.bind(this);
        this.startMove = this.startMove.bind(this);
        this.startCountdown = this.startCountdown.bind(this);
        this.stopCountdown = this.stopCountdown.bind(this);
        this.start = this.start.bind(this);
        this.startMove = this.startMove.bind(this);
        this.startMove = this.startMove.bind(this);
        this.startMove = this.startMove.bind(this);
        this.setConfigModal = this.setConfigModal.bind(this);
        this.stop = this.stop.bind(this);
        this.setActive = this.setActive.bind(this);
        this.tableOnAction = this.tableOnAction.bind(this);
    }
    
    //states
    //const [openingModal, setOpeningModal] = React.useState();
    //const [configModal, setConfigModal] = React.useState(page === "3" ? true : page === "0" && !firstTime);
    //const [countdownEye, setCountdownEye] = React.useState(false);
    //const [countdownMove, setCountdownMove] = React.useState(false);
    //const [eyeTime, setEyeTimeState] = React.useState(!firstTime ? config.eyeTime : 20);
    //const [eyeInterval, setEyeIntervalState] = React.useState(!firstTime ? config.eyeInterval : 20);
    //const [moveTime, setMoveTimeState] = React.useState(!firstTime ? config.moveTime : 5);
    //const [moveInterval, setMoveIntervalState] = React.useState(!firstTime ? config.moveInterval : 60);
    //const [enabled, setEnabledState] = React.useState({'eye': !firstTime ? config.eye : true, 'move': !firstTime ? config.move : true});
    //const [nav, setNav] = React.useState(page);
    //const [active, setActiveState] = React.useState(false);
    //const [countdownEyeInterval, setCountEye] = React.useState(false);
    //const [countdownMoveInterval, setMoveEye] = React.useState(false);

    //state functions
    setEyeTime(e){
        this.setState({eyeTime: e.target.value});
    }
    setEyeInterval(e){
        this.setState({eyeInterval: e.target.value});
    }
    setMoveTime(e){
        this.setState({moveTime: e.target.value});
    }
    setMoveInterval(e){
        this.setState({moveInterval: e.target.value});
    }
    setEnabled(newEnable){
        this.setState({enabled: newEnable});
    }
    setNav(val){
        this.setState({nav: val})
    }
    setConfigModal(val){
        this.setState({configModal: val})
    }
    setActive(val){
        this.setState({active: val});
    }
    handleEnabled(type){
        if (type === 'eye'){
            this.setState({enabled: {'eye': !this.state.enabled.eye, 'move': this.state.enabled.move}})
        }
        else {
            this.setState({enabled: {'eye': this.state.enabled.eye, 'move': !this.state.enabled.move}})
        }
    }

    componentDidMount(){
        let firstTime = true;
        let config = undefined;
        let page = '0';

        //Get Local Storage Values
        if (JSON.parse(localStorage.getItem('config')) !== null && Notification.permission === "granted"){
            firstTime = false;
            config = JSON.parse(localStorage.getItem('config'))
        }

        //Load Current Data
        if (JSON.parse(localStorage.getItem('data')) !== null){
            this.setState({data: JSON.parse(localStorage.getItem('data'))});
        }

        if (!firstTime){
            this.setState(
                {
                    eyeTime: config.eyeTime,
                    eyeInterval: config.eyeInterval,
                    moveTime: config.moveTime,
                    moveInterval: config.moveInterval,
                    enabled: {eye: config.eye, move: config.move}
                }
            )
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
        else if (path === "/info"){
            page = '4';
        }

        this.setState(
            { nav: page }
        )

        if (page === "3"){
            this.setState(
                { configModal: true }
            )
        }
        else if (firstTime){
            this.props.history.push('/')
            this.setState(
                { openingModal: true }
            )
        }
        else if (page === "0"){
            this.setState({nav: "1"});
            this.props.history.push("/dashboard")
        }

        window.addEventListener('beforeunload', (event) => {
            event.preventDefault();
            event.returnValue = '';
            
            let config = {'eye': this.state.enabled.eye, 'move': this.state.enabled.move, 'eyeTime': parseFloat(this.state.eyeTime), 'eyeInterval': parseFloat(this.state.eyeInterval), 'moveTime': parseFloat(this.state.moveTime), 'moveInterval': parseFloat(this.state.moveInterval)}
            localStorage.setItem('config', JSON.stringify(config));
            localStorage.setItem('active', this.state.active);
            localStorage.setItem('data', JSON.stringify(this.state.data));
        });
    }

    //Get Started Pop-up
    getStarted(){
        this.setState({openingModal: false});
        this.setState({configModal: true});
        this.props.history.push("/config")
        this.setState({nav: '3'})
    }

    //To Start
    startScreen(){
        if (!this.state.enabled.eye && !this.state.enabled.move){
            this.setState({configModal: false})
        }
        else if (Notification.permission === "granted"){
            this.setState({configModal: false})
            this.start();
        }
        else if (Notification.permission === "denied"){
            alert("Please enable Notifications to proceed further")
        }
        else{
            Notification.requestPermission();
            this.startScreen();
        }
        
    }

    //Countdown Functions
    startCountdown(type){
        if (type === "eye"){
            this.setState({countdownEye: true})
        }
        else if (type === "move"){
            this.setState({countdownMove: true})
        }
        //const history = useHistory();
        this.props.history.push('/dashboard')
        this.setState({nav: '1'})
    }

    stopCountdown(type){
        if (type === "eye"){
            this.setState({countdownEye: false})
            this.startEye();
        }
        else if (type === "move"){
            this.setState({countdownMove: false})
            this.startMove();
        }
        else if (type === "eyeInt"){
            this.setState({countdownEyeInterval: false});
            //this.PushNotification("Time to Look Away", "Click to start timer", 'eye')
        }
        else if (type === "moveInt"){
            this.setState({countdownMoveInterval: false});
            //this.PushNotification("Time to Look Away", "Click to start timer", 'eye')
        }
    }

    //Push Notification Function
    PushNotification(msg, des, type){
        let notifi = new Notification(msg, {body: des, icon: Icon});
        notifi.onclick = (event) => {
            window.focus();
            this.startCountdown(type);
        }
    }

    //Eye Countdown
    startEye(){
        let eyeTimeout = setTimeout(() => this.PushNotification("Time to Look Away", "Click to start timer", 'eye'), this.state.eyeInterval * 60000)
        this.setState({eyeTimeout: eyeTimeout, countdownEyeInterval: true})
    }

    //Move Countdown
    startMove(){
        let moveTimeout = setTimeout(() => this.PushNotification("Time to Move", "Click to start timer", "move"), this.state.moveInterval * 60000)
        this.setState({moveTimeout: moveTimeout, countdownMoveInterval: true})
    }

    //Actually Start
    start(){
        if (this.state.enabled.eye){
            this.startEye();
        }
        if (this.state.enabled.move){
            this.startMove();
        }
        if (this.state.enabled.eye | this.state.enabled.move){
            let today = new Date();
            let time = today.getHours() + ":" + today.getMinutes();
            localStorage.setItem('startTime', time);
            this.setState({active: true});
        }
        
    }

    //Table On Action
    tableOnAction(type, key){
        if (type === "delete"){
            let check = window.confirm("Are you sure you want to delete this record?");

            if (check){
                let data = this.state.data.filter(item => item.key !== key);
                this.setState({data: data});
            }
        }
    }

    //Stop Function
    stop(){
        this.setState({active: false, countdownEye: false, countdownMove: false, countdownEyeInterval: false, countdownMoveInterval: false});
        if (this.state.enabled.eye){
            clearTimeout(this.state.eyeTimeout)
        }
        if (this.state.enabled.move){
            clearTimeout(this.state.moveTimeout)
        }
        let today = new Date()
        let setDate = String(today.getMonth() + 1) + "/" + String(today.getDay()) + "/" + String(today.getFullYear());
        let key = 0
        if (this.state.data.length > 0){
            key = this.state.data[this.state.data.length-1].key + 1;
        }
        let start = localStorage.getItem('startTime').split(":");
        let time = [today.getHours(), today.getMinutes()];
        let setTime = time[0] !== parseInt(start[0]) ? String(time[0] - start[0]) + " Hours, ":"";
        setTime += String(time[1] - start[1]) + " Minutes";
        this.state.data.push({key: key, date: setDate, duration: setTime});
    }

    render() {

        return (
            <div className="Home">
                <div className = "row">
                    <div className = "col-md-3 nav-div">
                        <Navbar page = {this.state.nav} setNav = {this.setNav} stop = {this.stop} setConfigModal = {this.setConfigModal} active = {this.state.active}/>
                    </div>

                    <div className = "col-md-9">
                        <div style = {{marginRight: "2.5%"}}>

                        <div style = {window.location.pathname !== "/dashboard" ? {display: "none"} : {display: "block"}}>
                            <h2 style = {{color: "white"}}>Dashboard</h2><br/>

                            <div className="row">
                                {this.state.countdownEye && 
                                <div className = "col-md-6">
                                    <div className = "card-container">
                                        <Card variant = "outlined" className = "card-content">
                                            <CardContent className = "card-inside">
                                                <h3 color = "inherit">Eye Break Timer</h3><br/>
                                                <center>
                                                    <CountdownCircleTimer
                                                        isPlaying
                                                        duration={this.state.eyeTime}
                                                        size = {300}
                                                        colors={[
                                                        ['#004777', 0.33],
                                                        ['#F7B801', 0.33],
                                                        ['#A30000', 0.33],
                                                        ]}
                                                    >
                                                        {({ remainingTime }) => remainingTime !== 0 ? <h1>{remainingTime}</h1> : this.stopCountdown("eye")}
                                                    </CountdownCircleTimer>
                                                </center><br/>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                                }

                                {this.state.countdownMove && 
                                <div className = "col-md-6">
                                    <div className = "card-container">
                                    <Card variant = "outlined" className = "card-content">
                                        <CardContent className = "card-inside">
                                            <h3 color = "inherit">Move Break Timer</h3><br/>
                                            <center><CountdownCircleTimer
                                                isPlaying
                                                duration={this.state.moveTime * 60}
                                                size = {300}
                                                colors={[
                                                ['#004777', 0.33],
                                                ['#F7B801', 0.33],
                                                ['#A30000', 0.33],
                                                ]}
                                            >
                                                {({ remainingTime }) => remainingTime !== 0 ? <h1>{remainingTime > 60 ? Math.ceil(remainingTime/60) : remainingTime}</h1> : this.stopCountdown("move")}
                                            </CountdownCircleTimer></center><br/>
                                        </CardContent>
                                    </Card>
                                    </div>
                                </div>
                                }

                                {this.state.countdownEyeInterval && 
                                <div className = "col-md-3">
                                    <div className = "card-container">
                                    <Card variant = "outlined" className = "card-content">
                                        <CardContent className = "card-inside">
                                            <h5 color = "inherit">Time Till Eye Break</h5><br/>
                                            <center><CountdownCircleTimer
                                                isPlaying
                                                duration={this.state.eyeInterval * 60}
                                                size = {125}
                                                colors={[
                                                ['#004777', 0.33],
                                                ['#F7B801', 0.33],
                                                ['#A30000', 0.33],
                                                ]}
                                            >
                                                {({ remainingTime }) => remainingTime !== 0 ? <h4>{remainingTime > 60 ? Math.ceil(remainingTime/60) : remainingTime}</h4> : this.stopCountdown("eyeInt")}
                                            </CountdownCircleTimer></center>
                                        </CardContent>
                                    </Card>
                                    </div>
                                </div>
                                }

                                {this.state.countdownMoveInterval && 
                                <div className = "col-md-3">
                                    <div className="card-container">
                                    <Card variant = "outlined" className = "card-content">
                                        <CardContent className = "card-inside">
                                            <h5 color = "inherit">Time Till Move Break</h5><br/>
                                            <center><CountdownCircleTimer
                                                isPlaying
                                                duration={this.state.moveInterval * 60}
                                                size = {125}
                                                colors={[
                                                ['#004777', 0.33],
                                                ['#F7B801', 0.33],
                                                ['#A30000', 0.33],
                                                ]}
                                            >
                                                {({ remainingTime }) => remainingTime !== 0 ? <h4>{remainingTime > 60 ? Math.ceil(remainingTime/60) : remainingTime}</h4> : this.stopCountdown("moveInt")}
                                            </CountdownCircleTimer></center>
                                        </CardContent>
                                    </Card>
                                    </div>
                                </div>
                                }

                                {!this.state.active && 
                                    <div className = "col-md-3">
                                        <div className = "card-container">
                                            <Card variant = "outlined" className="card-content">
                                                <CardContent className = "card-inside">
                                                    <h4 color = "inherit">Get Started</h4><br/>
                                                    <p>Learn more about how you spend time with digital devices. Analyze the time that you spend, and how many breaks you take.</p>
                                                </CardContent>
                                                <CardActionArea style = {{paddingTop: "10px", paddingBottom: "10px"}} onClick = {this.startScreen}>
                                                    <h6>Start</h6>
                                                </CardActionArea>
                                            </Card>
                                        </div>
                                    </div>
                                }

                                <div className = "col-md-3">
                                    <div className = "card-container">
                                        <Card variant = "outlined" className = "card-content">
                                            <CardContent className = "card-inside">
                                                <h4 color = "inherit">Statistics</h4><br/>
                                                <p>Learn more about how you spend time with digital devices. Analyze the time that you spend, and how many breaks you take.</p>
                                            </CardContent>
                                            <CardActionArea style = {{paddingTop: "10px", paddingBottom: "10px"}} onClick = {() =>  {this.props.history.push("/stats"); this.setState({nav: "2"});}}>
                                                <h6>View</h6>
                                            </CardActionArea>
                                        </Card>
                                    </div>
                                </div>

                                <div className = "col-md-3">
                                    <div className = "card-container">
                                    <Card variant = "outlined" className="card-content">
                                        <CardContent className = "card-inside">
                                            <h4 color = "inherit">Configuration</h4><br/>
                                            <p>Learn more about how you spend time with digital devices. Analyze the time that you spend, and how many breaks you take.</p>
                                        </CardContent>
                                        <CardActionArea style = {{paddingTop: "10px", paddingBottom: "10px"}} onClick = {() => {this.props.history.push("/config"); this.setState({nav: "3", configModal: true});}}>
                                            <h6>View</h6>
                                        </CardActionArea>
                                    </Card>
                                    </div>
                                </div>

                                <div className = "col-md-3">
                                    <div className = "card-container">
                                    <Card variant = "outlined" className = "card-content">
                                        <CardContent className = "card-inside">
                                            <h4 color = "inherit">Learn More</h4><br/>
                                            <p>Learn more about how you spend time with digital devices. Analyze the time that you spend, and how many breaks you take.</p>
                                        </CardContent>
                                        <CardActionArea style = {{paddingTop: "10px", paddingBottom: "10px"}} onClick = {() => {this.props.history.push("/info"); this.setState({nav: "4"});}}>
                                            <h6>View</h6>
                                        </CardActionArea>
                                    </Card>
                                    </div>

                                </div>

                            </div>
                        </div>
                    

                        <div style = {window.location.pathname !== "/stats" ? {display: "none"} : {display: "block"}}>
                            <h2 style = {{color: "white"}}>Statistics</h2><br/>

                            <Table onAction = {this.tableOnAction} title = "Statistics" data = {this.state.data}/>

                        </div>


                        <div style = {window.location.pathname !== "/config" ? {display: "none"} : {display: "block"}}>
                            <h2 style = {{color: "white"}}>Configuration</h2><br/><br/>

                            <Button onClick = {() => this.setConfigModal(true)} color = "primary" variant = "contained">Open Configurator</Button>
                        </div>

                        <div style = {window.location.pathname !== "/info" ? {display: "none"} : {display: "block"}}>
                            <h2 style = {{color: "white"}}>Learn More</h2><br/><br/>
                        </div>

                    </div>
                    </div>
                </div>
                
                <GetStarted open = {this.state.openingModal} useStyles={useStyles} onAction = {this.getStarted}/>
                <Configurator 
                    open = {this.state.configModal} 
                    useStyles={useStyles} 
                    onAction={this.startScreen}
                    setEyeInterval = {this.setEyeInterval} 
                    eyeInterval = {this.state.eyeInterval}
                    setEyeTime = {this.setEyeTime}
                    eyeTime = {this.state.eyeTime}
                    moveTime = {this.state.moveTime}
                    setMoveTime = {this.setMoveTime}
                    moveInterval = {this.state.moveInterval}
                    setMoveInterval={this.setMoveInterval}
                    enabledState = {this.state.enabled}
                    setEnabledState = {this.setEnabled}
                    handleEnable = {this.handleEnabled}
                    setConfigModal = {this.setConfigModal}
                />
                
            </div>
        );
    }
}

//export default Home;
export default withRouter(Home);