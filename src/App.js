import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {ThemeProvider, createMuiTheme} from "@material-ui/core";

//Components
import Home from "./components/Home";
import NotFound from "./components/404";

function App() {

  const theme = createMuiTheme({
    palette: { 
      primary : {
        main: "#3D8888",
      },
      secondary: {
         main: "#FF0000",
      },
      type: "light",
    }
    
  });
  
  
  return (
    <div className="App">
      <ThemeProvider theme = {theme}>
        <BrowserRouter>
          <Switch>
            <Route exact path = "/" component={Home}/>
            <Route component={NotFound} />

          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
