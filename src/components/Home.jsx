import React from 'react';
import '../styles/style.css';

//Import images
import Icon from "../img/icon.png";

//Countdown Package
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

//React Router
import {withRouter} from "react-router-dom";

//Material UI
import { makeStyles, withStyles } from '@material-ui/core/styles';
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
        color: theme.palette.text.primary,
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

        let firstTime = true;
        let config = undefined;
        let page = '0';

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

        //Get Local Storage Values
        if (JSON.parse(localStorage.getItem('config')) !== null && Notification.permission === "granted"){
            firstTime = false;
            config = JSON.parse(localStorage.getItem('config'))
        }

        this.state = {
            openingModal: page !== "3" ? firstTime: false,
            configModal: page === "3" ? true : page === "0" && !firstTime,

            data: [
                {"date": "10/15/2020", "duration": "1 Hour"},
                {"date": "10/15/2020", "duration": "1 Hour"},
                {"date": "10/15/2020", "duration": "1 Hour"},
                {"date": "10/15/2020", "duration": "1 Hour"},
                {"date": "10/15/2020", "duration": "1 Hour"},
                {"date": "10/15/2020", "duration": "1 Hour"}
            ],

            countdownEye: false,
            countdownMove: false,
            countdownEyeInterval: false,
            countdownMoveInterval: false,

            eyeTime: !firstTime ? config.eyeTime : 20,
            eyeInterval: !firstTime ? config.eyeInterval : 20,
            moveTime: !firstTime ? config.moveTime : 5,
            moveInterval: !firstTime ? config.moveInterval : 60,

            enabled: {'eye': !firstTime ? config.eye : true, 'move': !firstTime ? config.move : true},
            nav: page,
            active: false
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
    handleEnabled(type){
        if (type === 'eye'){
            this.setState({enabled: {'eye': !this.state.enabled.eye, 'move': this.state.enabled.move}})
        }
        else {
            this.setState({enabled: {'eye': this.state.enabled.eye, 'move': !this.state.enabled.move}})
        }
    }

    componentDidMount(){
        window.addEventListener('beforeunload', (event) => {
            event.preventDefault();
            event.returnValue = '';
            
            let config = {'eye': this.state.enabled.eye, 'move': this.state.enabled.move, 'eyeTime': this.state.eyeTime, 'eyeInterval': this.state.eyeInterval, 'moveTime': this.state.moveTime, 'moveInterval': this.state.moveInterval}
            localStorage.setItem('config', JSON.stringify(config));
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
        if (!this.state.enabled.eye && !this.stateenabled.move){
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
        setTimeout(() => this.PushNotification("Time to Look Away", "Click to start timer", 'eye'), this.state.eyeInterval * 60000)
        this.setState({countdownEyeInterval: true})
    }

    //Move Countdown
    startMove(){
        setTimeout(() => this.PushNotification("Time to Move", "Click to start timer", "move"), this.state.moveInterval * 60000)
        this.setState({countdownMoveInterval: true})
    }

    //Actually Start
    start(){
        if (this.state.enabled.eye){
            this.startEye();
        }
        if (this.state.enabled.move){
            this.startMove();
        }
    }

    render() {
        const {classes} = this.props

        return (
            <div className="Home">
                <div className = "row">
                    <div className = "col-md-4 nav-div">
                        <Navbar page = {this.state.nav} setNav = {this.setNav} setConfigModal = {this.setConfigModal}/>
                    </div>

                    <div className = "col-md-8">
                        <div style = {{marginRight: "2.5%"}}>

                        <div style = {window.location.pathname !== "/dashboard" ? {display: "none"} : {display: "block"}}>
                            <h2 className = {classes.title}>Dashboard</h2><br/>

                            <div className="row">
                                {this.state.countdownEye && 
                                <div className = "col-md-6">
                                    <Card variant = "outlined" className = "container">
                                        <CardContent className = {classes.cardContent}>
                                            <h3 className = {classes.text}>Eye Break Timer</h3><br/>
                                            <center><CountdownCircleTimer
                                                isPlaying
                                                duration={this.state.eyeTime}
                                                size = {250}
                                                className = {classes.textColor}
                                                colors={[
                                                ['#004777', 0.33],
                                                ['#F7B801', 0.33],
                                                ['#A30000', 0.33],
                                                ]}
                                            >
                                                {({ remainingTime }) => remainingTime !== 0 ? <h1>{remainingTime}</h1> : this.stopCountdown("eye")}
                                            </CountdownCircleTimer></center><br/>
                                        </CardContent>
                                    </Card>
                                </div>
                                }

                                {this.state.countdownMove && 
                                <div className = "col-md-6">
                                    <Card variant = "outlined">
                                        <CardContent className = {classes.cardContent}>
                                            <h3 className = {classes.text}>Move Break Timer</h3><br/>
                                            <center><CountdownCircleTimer
                                                isPlaying
                                                duration={this.state.moveTime * 60}
                                                size = {250}
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
                                }

                                {this.state.countdownEyeInterval && 
                                <div className = "col-md-3">
                                    <Card variant = "outlined">
                                        <CardContent className = {classes.cardContent}>
                                            <h4 className = {classes.text}>Time Till Eye Break</h4><br/>
                                            <center><CountdownCircleTimer
                                                isPlaying
                                                duration={this.state.eyeInterval * 60}
                                                size = {125}
                                                className = {classes.textColor}
                                                colors={[
                                                ['#004777', 0.33],
                                                ['#F7B801', 0.33],
                                                ['#A30000', 0.33],
                                                ]}
                                            >
                                                {({ remainingTime }) => remainingTime !== 0 ? <h4>{remainingTime > 60 ? Math.ceil(remainingTime/60) : remainingTime}</h4> : this.stopCountdown("eyeInt")}
                                            </CountdownCircleTimer></center><br/>
                                        </CardContent>
                                    </Card>
                                </div>
                                }

                                {this.state.countdownMoveInterval && 
                                <div className = "col-md-3">
                                    <Card variant = "outlined" className = "container">
                                        <CardContent className = {classes.cardContent}>
                                            <h4 className = {classes.text}>Time Till Move Break</h4><br/>
                                            <center><CountdownCircleTimer
                                                isPlaying
                                                duration={this.state.moveInterval * 60}
                                                size = {125}
                                                className = {classes.textColor}
                                                colors={[
                                                ['#004777', 0.33],
                                                ['#F7B801', 0.33],
                                                ['#A30000', 0.33],
                                                ]}
                                            >
                                                {({ remainingTime }) => remainingTime !== 0 ? <h4>{remainingTime > 60 ? Math.ceil(remainingTime/60) : remainingTime}</h4> : this.stopCountdown("moveInt")}
                                            </CountdownCircleTimer></center><br/>
                                        </CardContent>
                                    </Card>
                                </div>
                                }

                                <div className = "col-md-3">
                                    <Card variant = "outlined">
                                        <CardContent className = {classes.cardContent}>
                                            <h4 className = {classes.text}>Statistics</h4><br/>
                                            <p>Learn more about how you spend time with digital devices. Analyze the time that you spend, and how many breaks you take.</p>
                                        </CardContent>
                                        <CardActionArea style = {{paddingTop: "10px", paddingBottom: "10px"}} onClick = {() =>  {this.props.history.push("/stats"); this.setState({nav: "2"});}}>
                                            <h6>View</h6>
                                        </CardActionArea>
                                    </Card>
                                </div>

                                <div className = "col-md-3">
                                    <Card variant = "outlined">
                                        <CardContent className = {classes.cardContent}>
                                            <h4 className = {classes.text}>Configuration</h4><br/>
                                            <p>Learn more about how you spend time with digital devices. Analyze the time that you spend, and how many breaks you take.</p>
                                        </CardContent>
                                        <CardActionArea style = {{paddingTop: "10px", paddingBottom: "10px"}} onClick = {() => {this.props.history.push("/config"); this.setState({nav: "3", configModal: true});}}>
                                            <h6>View</h6>
                                        </CardActionArea>
                                    </Card>
                                </div>

                                <div className = "col-md-3">
                                    <Card variant = "outlined">
                                        <CardContent className = {classes.cardContent}>
                                            <h4 className = {classes.text}>Learn More</h4><br/>
                                            <p>Learn more about how you spend time with digital devices. Analyze the time that you spend, and how many breaks you take.</p>
                                        </CardContent>
                                        <CardActionArea style = {{paddingTop: "10px", paddingBottom: "10px"}} onClick = {() => {this.props.history.push("/info"); this.setState({nav: "4"});}}>
                                            <h6>View</h6>
                                        </CardActionArea>
                                    </Card>
                                </div>

                            </div>
                        </div>
                    

                        <div style = {window.location.pathname !== "/stats" ? {display: "none"} : {display: "block"}}>
                            <h2 className = {classes.title}>Statistics</h2><br/>

                            <Table title = "Statistics" data = {this.state.data}/>

                        </div>


                        <div style = {window.location.pathname !== "/config" ? {display: "none"} : {display: "block"}}>
                            <h2 className = {classes.title}>Configuration</h2><br/><br/>

                            <Button onClick = {() => this.setConfigModal(true)} color = "primary" variant = "contained">Open Configurator</Button>
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
export default withRouter(withStyles(useStyles, { withTheme: true })(Home));