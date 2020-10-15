import React from 'react';
import '../styles/style.css';

//img
import Icon from "../img/icon.png";

//Material UI Theme
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import {createMuiTheme} from "@material-ui/core";

//MUI Icons
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

const useStyles = makeStyles((theme) => ({
    bgColor : {
        backgroundColor: theme.palette.primary.main
    },
}));

function Header(props) {
  const classes = useStyles();
  const [theme, modTheme] = React.useState(JSON.parse(localStorage.getItem('theme')));

  const handleToggle = () => {
    if (theme.palette.type === "dark"){
      theme.palette.type = "light";
      modTheme(theme);
      //props.setTheme(createMuiTheme(theme));
      localStorage.setItem('theme', JSON.stringify(theme));
      window.location.reload()
    }
    else {
      theme.palette.type = "dark";
      modTheme(theme);
      //props.setTheme(createMuiTheme(theme));
      localStorage.setItem('theme', JSON.stringify(theme));
      window.location.reload()
    }
  }

  return (
    <nav className={"container-fluid container-header " + classes.bgColor}>
    <div className="Navbar">

        <div className="row">
          {/* for small screen */}
          <div className="d-block d-sm-none col-md-12">
            <img
              src={Icon}
              className="icon d-inline-block m-2"
              style = {{textAlign: "left"}}
              alt="Logo"
            />
            <label
              className = {classes.textColor}
              style={{
                fontSize: "1.5em",
              }}
            >
              <b>Online Time</b>
            </label>
          </div>
          {/* for bigger screen */}
          <div className="d-none d-sm-block col-md-3">
            <img
              src={Icon}
              className="icon d-inline-block m-2"
              alt="Logo"
            />
          </div>
          <div className="d-none d-sm-block col-md-7 header-center text-center ">
            <b><label
              className = {"font-weight-bold ml-4 mr-4 "}
              style={{
                //fontFamily: "Palatino Linotype",
                fontSize: "3.2em",
                color: "inherit",
              }}
            >
              Online Time
            </label></b>
            <br />
            <label
              style={{
                //fontFamily: "Palatino Linotype",
                fontSize: "1.2em"
              }}
            >
                By: Tinu Vanapamula
            </label>
          </div>

          <div className="d-none d-sm-block col-md-2">
            <div className="form-inline my-2 my-lg-0 text-right">
              <div>
                {theme.palette.type === "dark" ? (
                      <Tooltip title="Toggle Light Mode">
                        <IconButton color="inherit" onClick={handleToggle}>
                          <Brightness7Icon />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Toggle Dark Mode">
                        <IconButton color="inherit" onClick={handleToggle}>
                          <Brightness4Icon />
                        </IconButton>
                      </Tooltip>
                    )}
                </div>
              </div>
          </div>
          

          
        </div>
    </div>
    </nav>
        
  );
}

export default Header;