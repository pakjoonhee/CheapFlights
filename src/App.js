import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Form, FormGroup, Input, option, Label } from 'reactstrap';

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
        <Form>
          <FormGroup>
            <Label for="goingTo">Going To</Label>
            <Input 
              name="goingTo"
              placeHolder="Destination, hotel name, airport, train station, landmark, or address" 
              value={this.state.goingTo} 
              onChange={e => this.change(e)} 
            />
          </FormGroup>
          <FormGroup>
            <Label for="goingTo">Check In</Label>
               
            <Input 
              name="checkIn"
              placeHolder="mm/dd/yyyy" 
              value={this.state.goingTo} 
              onChange={e => this.change(e)} 
            />
            <Label for="Check Out">Check Out</Label>
            <Input 
              name="checkOut"
              placeHolder="mm/dd/yyyy" 
              value={this.state.goingTo} 
              onChange={e => this.change(e)} 
            />
            <Label>Rooms</Label>
            <Input type="select" name="select" id="exampleSelect">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
            <Label>Adults(18+)</Label>
            <Input type="select" name="select" id="exampleSelect">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
            <Label>Children (0-17)</Label>
            <Input type="select" name="select" id="exampleSelect">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" />{' '}
              Add a flight
            </Label>
            <Label check>
              <Input type="checkbox" />{' '}
              Add a car
            </Label>
          </FormGroup>
        <br />
        <Button color="danger">Submit</Button>
        </Form>
      </div>
    );
  }
}

export default App;
