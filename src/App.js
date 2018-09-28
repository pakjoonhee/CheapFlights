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

  numberOptions = () => {
    let options = []
    for(let i=0; i<11; i++) {
      options.push(<option>{`${i}`}</option>)
    }
    return options
  }

  render() {
    return (
      <Form>
        <Row className="row">
          <Col sm={{ size: 5, offset: 1 }}>
            <Label>Flying from</Label>
            <Input 
              name="flyingFrom"
              placeHolder="City or airport" 
              value={this.state.flyingFrom} 
              onChange={e => this.change(e)} />
          </Col>
          <Col sm={{ size: 5 }}>
            <Label>Flying to</Label>
            <Input 
              name="flyingTo"
              placeHolder="City or airport" 
              value={this.state.flyingTo} 
              onChange={e => this.change(e)} />
          </Col>
        </Row>

        <Row>
          <Col sm={{ size: 3, offset: 1 }}>
            <Label>Returning</Label>
            <Input 
              name="returning"
              placeHolder="mm/dd/yyyy" 
              value={this.state.returning} 
              onChange={e => this.change(e)} />
          </Col>
          <Col sm={{ size: 3 }}>
            <Label>Returning</Label>
            <Input 
              name="returning"
              placeHolder="mm/dd/yyyy" 
              value={this.state.returning} 
              onChange={e => this.change(e)} />
          </Col>
          <Col xs="1"> 
            <Label>Adults(18+)</Label>
            <Input type="select" name="select" id="exampleSelect">
              {this.numberOptions()}
            </Input>
          </Col>
          <Col xs="1.5">
            <Label>Children (0-17)</Label>
            <Input type="select" name="select" id="exampleSelect">
              {this.numberOptions()}
            </Input>
          </Col>
        </Row>
        
        <Row>
          <Col sm={{ size: 2, offset: 1 }}>
              <FormGroup check>
                <Label>
                  <Input type="checkbox" />{''}
                  Check me out
                </Label>
              </FormGroup>
          </Col>
          <Col>
                <Label>
                  <Input type="checkbox" />{''}
                  Check me out
                </Label>
          </Col>
        </Row>
        

        {/* <Button color="danger">Submit</Button> */}
      </Form>
    );
  }
}

export default App;
