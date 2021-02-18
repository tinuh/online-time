import React from 'react';
import 'rsuite/dist/styles/rsuite-default.css';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {ThemeProvider, createMuiTheme} from "@material-ui/core";
import AdSense from 'react-adsense';

//Components
import Home from "./components/Home";
import Header from "./components/Header";
import NotFound from "./components/404";

function App() {

  //Theming Engine
  let storedTheme = JSON.parse(localStorage.getItem('theme'));
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

  let storedSound = localStorage.getItem('sound');
  if (storedSound === null){
    storedSound = true;
    localStorage.setItem('sound', storedSound);
  }
  
  const [sound, setSound] = React.useState(storedSound === 'true');
  const [theme, setTheme] = React.useState(createMuiTheme(storedTheme));

  return (
    <div className="App">
        <BrowserRouter>
          <ThemeProvider theme = {theme}>
          
            <Header setTheme = {setTheme} sound = {sound} setSound = {setSound}/>

            <Switch>
              <Route exact path = "/">
                <Home sound = {sound}/>
              </Route>
              <Route exact path = "/dashboard">
                <Home sound = {sound}/>
              </Route>
              <Route exact path = "/stats">
                <Home sound = {sound}/>
              </Route>
              <Route exact path = "/config">
                <Home sound = {sound}/>
              </Route>
              <Route exact path = "/info">
                <Home sound = {sound}/>
              </Route>
              <Route exact path = "/tools">
                <Home sound = {sound}/>
              </Route>
              <Route component={NotFound} />

            </Switch>

            <AdSense.Google
              client='ca-pub-5925944145079992'
              slot='9001069033'
              style={{ display: 'block' }}
              format='auto'
              responsive='true'
            />
            
          </ThemeProvider>
        </BrowserRouter>
    </div>
  );
}

export default App;