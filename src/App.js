import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {ThemeProvider} from "@material-ui/core";

//Components
import Home from "./components/Home";
import NotFound from "./components/404";

function App() {
  return (
    <div className="App">
      <ThemeProvider>
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
