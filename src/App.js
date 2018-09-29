import React, { Component } from 'react';
import './App.css';
import AirplaneForm from './containers/AirplaneForm/AirplaneForm'
import { Route, Switch } from 'react-router-dom'
import AirplaneSearchResults from './containers/AirplaneSearchResults/AirplaneSearchResults';
import Main from './Main'

class App extends Component { 
  

  render() {
    return (
      <Main />
    );
  }
}

export default App;
