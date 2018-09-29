import React, {Component} from 'react';
import { Button, Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom'


class AirplaneForm extends Component {
  state = {
    flyingFrom: "",
    flyingTo: "",
    departing: "",
    returning: "",
    adults: "",
    children: "",
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

  datahandler = () => {
    console.log(this.state)
  }
  
  render () {
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
            <Label>Departing</Label>
            <Input 
              type="date"
              name="departing"
              placeHolder="mm/dd/yyyy" 
              value={this.state.departing} 
              onChange={e => this.change(e)} />
          </Col>
          <Col sm={{ size: 3 }}>
            <Label>Returning</Label>
            <Input 
              type="date"
              name="returning"
              placeHolder="mm/dd/yyyy" 
              value={this.state.returning} 
              onChange={e => this.change(e)} />
          </Col>
          <Col xs="1"> 
            <FormGroup>
              <Label>Adults(18+)</Label>
              <Input 
                type="select" 
                name="adults" 
                value={this.state.adults}
                onChange={e => this.change(e)}>
                {this.numberOptions()}
              </Input>
            </FormGroup>
          </Col>
          <Col xs="1.5">
            <FormGroup>
              <Label>Children (0-17)</Label>
              <Input 
                type="select" 
                name="children" 
                value={this.state.children}
                onChange={e => this.change(e)}>
                {this.numberOptions()}
              </Input>
            </FormGroup>
          </Col>
        </Row>
        
        {/* <Row>
          <Col sm={{ size: 2, offset: 1 }}>
            <FormGroup check>
              <Label>
                <Input type="checkbox" />{''}
                Check me out
              </Label>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup check>
              <Label>
                <Input type="checkbox" />{''}
                Check me out
              </Label>
            </FormGroup>
          </Col>
        </Row> */}
        
        <Row>
          <Col sm={{ size: 2, offset: 1 }}>
            <Link to='/airplaneSearchResults'>
              <Button 
                color="danger"
                // onClick={e=> this.dataHandler()}
                >Submit
              </Button>
            </Link>
          </Col>
        </Row>

      </Form>
    )
  }
}

export default AirplaneForm