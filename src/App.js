import React, { Component } from 'react';
import './App.css';
import AirplaneForm from './containers/AirplaneForm/AirplaneForm'
import { Route, Switch } from 'react-router-dom'

class App extends Component { 
  

  render() {
    return (
      <Switch>
        <Route path="/" component={AirplaneForm} />
      </Switch>
      // <AirplaneForm/>
    );
  }
}

export default App;
