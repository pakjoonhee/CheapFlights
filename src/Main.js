import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AirplaneForm from './components/AirplaneForm/AirplaneForm'
import AirplaneSearchResults from './components/AirplaneSearchResults/AirplaneSearchResults';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={AirplaneForm}/>
      <Route path='/airplaneSearchResults' component={AirplaneSearchResults}/>
    </Switch>
  </main>
)

export default Main
