import React from 'react';
import 'rsuite/dist/styles/rsuite-default.css';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {ThemeProvider, createMuiTheme} from "@material-ui/core";

//Components
import Home from "./components/Home";
import Header from "./components/Header";
import NotFound from "./components/404";

function App() {

  //Theming Engine
  var storedTheme = JSON.parse(localStorage.getItem('theme'));
  if (storedTheme === null){
    storedTheme = {
      palette: { 
        primary : {
          main: "#3D8888",
        },
        secondary: {
           main: "#FF0000",
        },
        type: "light",
      }
    }
    localStorage.setItem('theme', JSON.stringify(storedTheme))
  }


  const [theme, setTheme] = React.useState(createMuiTheme(storedTheme))

  return (
    <div className="App">
        <BrowserRouter>
          <ThemeProvider theme = {theme}>
          
            <Header setTheme = {setTheme} />

            <Switch>
              <Route exact path = "/" component={Home}/>
              <Route exact path = "/dashboard" component={Home}/>
              <Route exact path = "/stats" component={Home}/>
              <Route exact path = "/config" component={Home}/>
              <Route exact path = "/info" component={Home}/>
              <Route component={NotFound} />

            </Switch>
            </ThemeProvider>
        </BrowserRouter>
    </div>
  );
}

export default App;