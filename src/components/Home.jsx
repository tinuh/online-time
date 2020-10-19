import React from 'react';
//import {Fragment} from 'react';
import '../styles/style.css';

//Import images
import Icon from "../img/icon.png";

//Import Sounds
import Ding from "../sound/ding.mp3";

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
import Breathing from './breathing.jsx';
import Ergonomics from './ergonomics';
import Excercises from './excercises';

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

        //let ding = new Audio(Ding);

        this.state = {
            openingModal: false,
            configModal: false,

            data: [],

            countdownEye: false,
            countdownMove: false,
            countdownEyeInterval: false,
            countdownMoveInterval: false,
            countdownWaterInterval: false,

            eyeTime: 20,
            eyeInterval: 20,
            moveTime: 5,
            moveInterval: 60,
            waterInterval: 30,
            enabled: {'eye': true, 'move': true, 'water': true},
            moveTrigger: true,

            //Tools
            breathing: false,
            ergonomics: false,
            exercises: false,

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
        this.tableOnDelete = this.tableOnDelete.bind(this);
        this.setWaterInterval = this.setWaterInterval.bind(this);
        this.setMoveTrigger = this.setMoveTrigger.bind(this);
        this.startWater = this.startWater.bind(this);
        this.deepBreathing = this.deepBreathing.bind(this);
        this.ergonomics = this.ergonomics.bind(this);
        this.exercises = this.exercises.bind(this);
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
    setWaterInterval(e){
        this.setState({waterInterval: e.target.value});
    }
    setMoveTrigger(e){
        this.setState({moveTrigger: e.target.value})
    }
    setEnabled(newEnable){
        this.setState({enabled: newEnable});
    }
    setNav(val){
        this.setState({nav: val});
    }
    setConfigModal(val){
        this.setState({configModal: val});
    }
    setActive(val){
        this.setState({active: val});
    }
    handleEnabled(type){
        if (type === 'eye'){
            this.setState({enabled: {'eye': !this.state.enabled.eye, 'move': this.state.enabled.move, 'water': this.state.enabled.water}})
        }
        else if (type === 'move'){
            this.setState({enabled: {'eye': this.state.enabled.eye, 'move': !this.state.enabled.move, 'water': this.state.enabled.water}})
        }
        else {
            this.setState({enabled: {'eye': this.state.enabled.eye, 'move': this.state.enabled.move, 'water': !this.state.enabled.water}})
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
                    waterInterval: config.waterInterval,
                    enabled: {eye: config.eye, move: config.move, water: config.water}
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
        else if (path === "/tools"){
            page = '4';
        }
        else if (path === "/info"){
            page = '5';
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
            
            let config = {
                'eye': this.state.enabled.eye,
                'move': this.state.enabled.move,
                'water': this.state.enabled.water,
                'eyeTime': parseFloat(this.state.eyeTime),
                'eyeInterval': parseFloat(this.state.eyeInterval), 
                'moveTime': parseFloat(this.state.moveTime), 
                'moveInterval': parseFloat(this.state.moveInterval),
                'waterInterval': parseFloat(this.state.waterInterval)
            }
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
        if (!this.state.enabled.eye && !this.state.enabled.move && !this.state.enabled.water){
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
            this.setState({countdownEye: true});
        }
        else if (type === "move"){
            this.setState({countdownMove: true});
            if (this.state.moveTrigger){
                this.exercises();
            }
        }
        else if (type === "water"){
            if (!this.state.countdownWaterInterval){
                this.startWater();
            }
        }
        //const history = useHistory();
        this.props.history.push('/dashboard')
        this.setState({nav: '1'})
    }

    stopCountdown(type){
        if (type === "eye"){
            let ding = new Audio(Ding);
            if (this.props.sound){
                ding.play();
            }
            this.setState({countdownEye: false})
            this.startEye();
        }
        else if (type === "move"){
            let ding = new Audio(Ding);
            if (this.props.sound){
                ding.play();
            }
            this.setState({countdownMove: false, exercises: false})
            this.startMove();
        }
        else if (type === "waterInt"){
            this.setState({countdownWaterInterval: false});
            //this.startWater();
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
    PushNotification(msg, des, type=null, focus=false){
        let notifi = new Notification(msg, {body: des, icon: Icon});
        if (type !== null){
            notifi.onclick = (event) => {
                focus ? window.focus() : console.log("No Focus");
                this.startCountdown(type);
            }
        }
    }

    //Eye Countdown
    startEye(){
        let eyeTimeout = setTimeout(() => this.PushNotification("Time to Look Away", "Click to start timer", 'eye', true), this.state.eyeInterval * 60000)
        this.setState({eyeTimeout: eyeTimeout, countdownEyeInterval: true})
    }

    //Move Countdown
    startMove(){
        let moveTimeout = setTimeout(() => this.PushNotification("Time to Move", "Click to start timer", "move", true), this.state.moveInterval * 60000)
        this.setState({moveTimeout: moveTimeout, countdownMoveInterval: true})
    }

    //Start Water Countdown
    startWater(){
        let waterTimeout = setTimeout(() => this.PushNotification("Hydration Time", "Time to drink some water", 'water'), this.state.waterInterval * 60000)
        this.setState({waterTimeout: waterTimeout, countdownWaterInterval: true})
    }

    //Actually Start
    start(){
        if (this.state.enabled.eye){
            this.startEye();
        }
        if (this.state.enabled.move){
            this.startMove();
        }
        if (this.state.enabled.water){
            this.startWater();
        }
        if (this.state.enabled.eye | this.state.enabled.move | this.state.enabled.water){
            let today = new Date();
            let time = today.getHours() + ":" + today.getMinutes();
            localStorage.setItem('startTime', time);
            this.setState({active: true, nav: '1'});
            this.props.history.push("/dashboard");
        }
        
    }

    //Table On Action
    tableOnDelete(rowsDeleted){
        let check = window.confirm("Are you sure you want to delete these records?");
        let deletedList = [];
        let data = [...this.state.data];

        if (check){
            for (let i in rowsDeleted.data) {
                deletedList.push(rowsDeleted.data[i].dataIndex);
            }
            deletedList.sort((a, b) => (a > b) ? -1 : 1);
            console.log(deletedList)
            
            for (let x in deletedList){
                data.pop(deletedList[x]);
            }
            //console.log(data);
            this.setState({data: data})
        }

        return false;
    }

    //Stop Function
    stop(){
        this.setState({
            active: false, 
            countdownEye: false, 
            countdownMove: false, 
            countdownEyeInterval: false, 
            countdownMoveInterval: false, 
            countdownWaterInterval: false
        });
        if (this.state.enabled.eye){
            clearTimeout(this.state.eyeTimeout)
        }
        if (this.state.enabled.move){
            clearTimeout(this.state.moveTimeout)
        }
        if (this.state.enabled.water){
            clearTimeout(this.state.waterTimeout)
        }
        let today = new Date()
        let setDate = String(today.getMonth() + 1) + "/" + String(today.getDate()) + "/" + String(today.getFullYear());
        let id = 0
        if (this.state.data.length > 0){
            id = this.state.data[this.state.data.length-1].id + 1;
        }
        let startList = localStorage.getItem('startTime').split(":");
        let start =  parseInt(startList[0] * 60) + (parseInt(startList[1]));
        let currentTime = (today.getHours() * 60) + today.getMinutes();
        let time = [parseInt((currentTime-start)/60), (currentTime-start) % 60];
        let setTime = time[0] !== 0 ? String(time[0]) + " Hours, ":"";
        setTime += String(time[1]) + " Minutes";
        this.state.data.push({id: id, date: setDate, duration: setTime});
    }

    //Tools

    //Deep Breathing
    deepBreathing(){
        this.setState({breathing: true});
    }

    stopBreathing(){
        this.setState({breathing: false});
    }

    ergonomics(){
        this.setState({ergonomics: true});
    }

    exercises(){
        this.setState({exercises: true});
    }

    render() {

        return (
            <div className="Home">
                <div className = "row">
                    <div className = "col-md-3 nav-div">
                        <Navbar page = {this.state.nav} setNav = {this.setNav} stop = {this.stop} setConfigModal = {this.setConfigModal} active = {this.state.active}/>
                    </div>

                    {/*Tools*/}
                    <Breathing open = {this.state.breathing} stop = {() => this.setState({breathing: false})}/>
                    <Ergonomics open = {this.state.ergonomics} stop = {() => this.setState({ergonomics: false})}/>
                    <Excercises open = {this.state.exercises} stop = {() => this.setState({exercises: false})} />

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
                                
                                {//(!this.state.countdownEye && this.state.countdownMove) | (this.state.countdownEye && !this.state.countdownMove) ? <div className = "row"> : </>
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

                                {this.state.countdownWaterInterval && 
                                <div className = "col-md-3">
                                    <div className="card-container">
                                    <Card variant = "outlined" className = "card-content">
                                        <CardContent className = "card-inside">
                                            <h5 color = "inherit">Time Till Water Break</h5><br/>
                                            <center><CountdownCircleTimer
                                                isPlaying
                                                duration={this.state.waterInterval * 60}
                                                size = {125}
                                                colors={[
                                                ['#004777', 0.33],
                                                ['#F7B801', 0.33],
                                                ['#A30000', 0.33],
                                                ]}
                                            >
                                                {({ remainingTime }) => remainingTime !== 0 ? <h4>{remainingTime > 60 ? Math.ceil(remainingTime/60) : remainingTime}</h4> : this.stopCountdown("waterInt")}
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
                                                    <p>Get started with digital fit and reduce the side-effects of extended use of your digital devices. Click on start to get started.</p>
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
                                            <h4 color = "inherit">Tools</h4><br/>
                                            <p>Use some great tools such as the Breathing exercise, or desk excercises to guide your work experince and take a break.</p>
                                        </CardContent>
                                        <CardActionArea style = {{paddingTop: "10px", paddingBottom: "10px"}} onClick = {() => {this.props.history.push("/tools"); this.setState({nav: "4"});}}>
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
                                            <p>Learn more about the features of the digital fit application, overview of the problem and the beneifts it provides to you.</p>
                                        </CardContent>
                                        <CardActionArea style = {{paddingTop: "10px", paddingBottom: "10px"}} onClick = {() => {this.props.history.push("/info"); this.setState({nav: "5"});}}>
                                            <h6>View</h6>
                                        </CardActionArea>
                                    </Card>
                                    </div>

                                </div>

                            </div>
                        </div>
                    

                        <div style = {window.location.pathname !== "/stats" ? {display: "none"} : {display: "block"}}>
                            <h2 style = {{color: "white"}}>Statistics</h2><br/>

                            <Table 
                                onAction = {this.tableOnDelete} 
                                title = "Records" 
                                data = {this.state.data}
                                columns = {[
                                    {name: 'date', label: 'Date', options : {
                                        sort: true,
                                        filter: true
                                    }},
                                    {name: 'duration', label: 'Duration', options: {
                                        filter: false,
                                        sort: true,
                                    } },
                                ]}
                            />

                        </div>


                        <div style = {window.location.pathname !== "/config" ? {display: "none"} : {display: "block"}}>
                            <h2 style = {{color: "white"}}>Configuration</h2><br/><br/>

                            <Button onClick = {() => this.setConfigModal(true)} color = "primary" variant = "contained">Open Configurator</Button>
                        </div>

                        <div style = {window.location.pathname !== "/tools" ? {display: "none"} : {display: "block"}}>
                            <h2 style = {{color: "white"}}>Tools</h2><br/>

                            <div className = "row tools">
                                <div className = "col-md-4">
                                    <div className = "card-container">
                                        <Card variant = "outlined" className = "card-content">
                                            <CardContent className = "card-inside">
                                                <h4 color = "inherit">Breathing Exercise</h4><br/>
                                                <p>Relax and take a break from working by taking long deep breaths. Disconnect from work and take a moment to relax and wind down.</p>
                                            </CardContent>
                                            <CardActionArea style = {{paddingTop: "10px", paddingBottom: "10px"}} onClick = {this.deepBreathing}>
                                                <h6>Start</h6>
                                            </CardActionArea>
                                        </Card>
                                    </div>
                                </div>

                                <div className = "col-md-4">
                                    <div className = "card-container">
                                        <Card variant = "outlined" className = "card-content">
                                            <CardContent className = "card-inside">
                                                <h4 color = "inherit">Ergonomics Lesson</h4><br/>
                                                <p>Take a moment to learn about the proper way to sit at your desk to prevent body/chronic pains and promote overall health.</p>
                                            </CardContent>
                                            <CardActionArea style = {{paddingTop: "10px", paddingBottom: "10px"}} onClick = {() => this.ergonomics()}>
                                                <h6>Start</h6>
                                            </CardActionArea>
                                        </Card>
                                    </div>
                                </div>

                                <div className = "col-md-4">
                                    <div className = "card-container">
                                        <Card variant = "outlined" className = "card-content">
                                            <CardContent className = "card-inside">
                                                <h4 color = "inherit">Desk Exercises</h4><br/>
                                                <p>Perform exercises at your desk without getting up, this can be useful to do once every so often in order to avoid inactivity and prevent chronic pain.</p>
                                            </CardContent>
                                            <CardActionArea style = {{paddingTop: "10px", paddingBottom: "10px"}} onClick = {() =>  this.exercises()}>
                                                <h6>Start</h6>
                                            </CardActionArea>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style = {window.location.pathname !== "/info" ? {display: "none"} : {display: "block"}}>
                            <h2 style = {{color: "white"}}>Learn More</h2><br/>

                            <p style = {{paddingLeft: "5%", paddingRight: '5%',color: 'white', textAlign: 'left', fontSize: '1.6rem'}}>
                                 &nbsp;&nbsp;&nbsp; Welcome to Digital Fit.
                                 More than ever, we are spending more and more time on our digital devices. 
                                 This can have many side effects. 
                                 The first of which is eye strain, it can be quite damaging for your eyes to focus on a bright screen for a long time. 
                                 Optometrists recommend following the 20-20-20 rule, which is to look away from our screen every 20 minutes, for 20 seconds at something that is 20 feet in the distance. 
                                 Furthermore, working at a desk for a long time can cause chronic health problems. 
                                 That is why it is important to keep our body active and work while maintaining proper ergonomics.<br/>

                                 <br/> &nbsp;&nbsp;&nbsp; Digital Fit is a brand new web application built on the react.js framework.
                                 This application does not use a database and all of your data will be safely secured on your own computer.
                                 It allows you to set reminders for eye-breaks which help prevent eye strain, move breaks to help prevent inactivity, and water breaks to keep yourself hydrated.
                                 The tools tab provides important tools which includes the breathing exercise, ergonomics lesson, and exercises that you can do right at your desk.
                                 The source for desk exercises is printerland.co.uk.
                                 The statistics tab on the right will record every session in which you are working and allows you download, and filter through that data.
                                 This can be helpful when you want to get a sense of how long you work each day.

                            </p>
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
                    waterInterval = {this.state.waterInterval}
                    setWaterInterval = {this.setWaterInterval}
                    moveTrigger = {this.state.moveTrigger}
                    setMoveTrigger = {this.setMoveTrigger}
                />
                
            </div>
        );
    }
}

//export default Home;
export default withRouter(Home);