import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'reactstrap';

class App extends Component {
  state = {
    goingTo: "",
    checkIn: "",
    checkOut: "",
    Rooms: "",
    Adults: "",
    Children: "",
    addAFlight: "",
    addACar: ""
  }

  change = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <form>
          <input 
            name="goingTo"
            placeHolder="Destination, hotel name, airport, train station, landmark, or address" 
            value={this.state.goingTo} 
            onChange={e => this.change(e)} 
          />
        <br />
        <Button color="danger">Search</Button>
        </form>
      </div>
    );
  }
}

export default App;
