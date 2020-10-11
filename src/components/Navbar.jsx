import React from 'react';
import '../styles/style.css';

//rsuite
import { Sidenav, Nav, Icon} from 'rsuite';

//React Router
import {useHistory} from "react-router-dom";

//Material UI Theme
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    bgColor : {
        color: theme.palette.primary.main
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
    }  

  return (
      <div className = "side-nav">
          <div style={{ width: 250 }}>
            <Sidenav activeKey={props.page}>
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
                </Nav>
            </Sidenav.Body>
            </Sidenav>
        </div>
      </div>
  );
}

export default Navbar;