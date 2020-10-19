import React from 'react';
import '../styles/style.css';

//rsuite
import { Sidenav, Nav, Icon} from 'rsuite';

//React Router
import {useHistory} from "react-router-dom";

//Material UI Theme
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    bgColor : {
        backgroundColor: theme.palette.background.paper,
    },
}));

function Navbar(props) {
    const classes = useStyles();
    const history = useHistory();

    const dash = () => {
        props.setNav("1");
        history.push("/dashboard");
    }

    const stats = () => {
        props.setNav("2");
        history.push("/stats");
    }  

    const config = () => {
        props.setNav("3");
        history.push("/config");
        props.setConfigModal(true);
    }

    const tools = () => {
        props.setNav("4");
        history.push("/tools");
    }  

    const info = () => {
        props.setNav("5");
        history.push("/info");
    }  

  return (
      <div className = "side-nav">
          <div style={{ width: "100%" }}>
            <Sidenav activeKey={props.page} className = {classes.bgColor}>
            <Sidenav.Body>
                <Nav>
                    <Nav.Item onClick = {dash} eventKey="1" icon={<Icon icon="dashboard" />}>
                        Dashboard
                    </Nav.Item>
                    <Nav.Item onClick = {stats} eventKey="2" icon={<Icon icon="bar-chart" />}>
                        Statistics
                    </Nav.Item>
                    <Nav.Item onClick = {config} eventKey="3" icon={<Icon icon="gear-circle" />}>
                        Configuration
                    </Nav.Item>
                    <Nav.Item onClick = {tools} eventKey="4" icon={<Icon icon="bolt" />}>
                        Tools
                    </Nav.Item>
                    <Nav.Item onClick = {info} eventKey="5" icon={<Icon icon="info-circle" />}>
                        Learn More
                    </Nav.Item>

                    
                </Nav>  
            </Sidenav.Body>
            </Sidenav><br/>
            {props.active &&
                <Button onClick = {props.stop} variant = "contained" style = {{backgroundColor: 'red', color: 'white'}}>Stop</Button>
            }
        </div>
      </div>
  );
}

export default Navbar;