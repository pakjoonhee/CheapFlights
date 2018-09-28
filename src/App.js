import React, { Component } from 'react';
import './App.css';
import AirplaneForm from './containers/AirplaneForm/AirplaneForm'
import { Route, Switch } from 'react-router-dom'
import AirplaneSearchResults from './containers/AirplaneSearchResults/AirplaneSearchResults';

class App extends Component { 
  

  render() {
    return (
      <Switch>
        <Route path="/" component={AirplaneForm} />
        <Route path="/searchresults" component={AirplaneSearchResults} />
      </Switch>
      // <AirplaneForm/>
    );
  }
}

export default App;
