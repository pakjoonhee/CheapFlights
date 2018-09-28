import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';

class App extends Component {
  state = {
    flyingFrom: "",
    flyingTo: "",
    departing: "",
    returning: "",
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
      <Form>
        <Row>
          <Col xs="5">
            <Label>Flying from</Label>
            <Input 
              name="flyingFrom"
              placeHolder="City or airport" 
              value={this.state.flyingFrom} 
              onChange={e => this.change(e)} />
          </Col>
          <Col xs="5">
            <Label>Flying to</Label>
            <Input 
              name="flyingTo"
              placeHolder="City or airport" 
              value={this.state.flyingTo} 
              onChange={e => this.change(e)} />
          </Col>
        </Row>

        <Row>
          <Col xs="3">
            <Label>Returning</Label>
            <Input 
              name="returning"
              placeHolder="mm/dd/yyyy" 
              value={this.state.returning} 
              onChange={e => this.change(e)} />
          </Col>
          <Col xs="2"> 
            <Label>Adults(18+)</Label>
            <Input type="select" name="select" id="exampleSelect">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
          </Col>
          <Col xs="2">
            <Label>Children (0-17)</Label>
            <Input type="select" name="select" id="exampleSelect">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
          </Col>
        </Row>
        
        <FormGroup check>
          <Label check>
            <Input type="checkbox" />{' '}
            Check me out
          </Label>
          <Label check>
            <Input type="checkbox" />{' '}
            Check me out
          </Label>
        </FormGroup>
        <Button color="danger">Submit</Button>
      </Form>
    );
  }
}

export default App;
