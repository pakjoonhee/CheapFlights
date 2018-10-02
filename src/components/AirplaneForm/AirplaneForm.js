import React, {Component} from 'react';
import { Button, Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';
import './AirplaneForm.css'

class AirplaneForm extends Component {
  constructor() {
    super();
    this.state = {
      fields: {
        adults:0,
        children:0
      },
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this);
    this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);
  };

  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });
  }

  submituserRegistrationForm(e) {
    const newto = {
      pathname: "/airplaneSearchResults",
      data: this.state
    }

    e.preventDefault();
    if (this.validateForm()) {
        let fields = {};
        fields["flyingFrom"] = "";
        fields["flyingTo"] = "";
        fields["departing"] = "";
        fields["returning"] = "";
        fields["adults"] = "";
        fields["children"] = "";
        localStorage.setItem('airplaneDetails', JSON.stringify(this.state))
        this.setState({fields:fields});
        this.props.history.push(newto)
    }
  }

  validateForm() {

    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["flyingFrom"]) {
      formIsValid = false;
      errors["flyingFrom"] = "*Please enter your starting destination.";
    }

    if (typeof fields["flyingFrom"] !== "undefined") {
      if (!fields["flyingFrom"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["flyingFrom"] = "*Please enter alphabet characters only.";
      }
    }

    if (!fields["flyingTo"]) {
      formIsValid = false;
      errors["flyingTo"] = "*Please enter your destination.";
    }

    if (typeof fields["flyingTo"] !== "undefined") {
      if (!fields["flyingTo"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["flyingTo"] = "*Please enter alphabet characters only.";
      }
    }

    if (!fields["departing"]) {
      formIsValid = false;
      errors["departing"] = "*Please enter a date.";
    }

    if (typeof fields["departing"] !== "undefined") {
      if (!fields["departing"].match(/(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/)) {
        formIsValid = false;
        errors["departing"] = "*Please enter alphabet characters only.";
      }
    }

    if (!fields["returning"]) {
      formIsValid = false;
      errors["returning"] = "*Please enter a date.";
    }

    if (typeof fields["returning"] !== "undefined") {
      if (!fields["returning"].match(/(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/)) {
        formIsValid = false;
        errors["returning"] = "*Please enter alphabet characters only.";
      }
    }

    if (fields["adults"]===0  && fields["children"]===0) {
      formIsValid = false;
      errors["adults"] = "*Select Quantity.";
      errors["children"] = "*Select Quantity.";
    }

    this.setState({
      errors: errors
    });
    return formIsValid;
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

  render () {
    
    return (
      <Form method="post" name="userFlightDetails" onSubmit={this.submituserRegistrationForm}>
        <Row className="row">
          <Col sm={{ size: 5, offset: 1 }}>
            <Label>Flying from</Label>
            <Input 
              name="flyingFrom"
              placeHolder="City or airport" 
              value={this.state.flyingFrom} 
              onChange={this.handleChange} />
            <div className="errorMsg">{this.state.errors.flyingFrom}</div>
          </Col>
          <Col sm={{ size: 5 }}>
            <Label>Flying to</Label>
            <Input 
              name="flyingTo"
              placeHolder="City or airport" 
              value={this.state.flyingTo} 
              onChange={this.handleChange} />
            <div className="errorMsg">{this.state.errors.flyingTo}</div>
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
              onChange={this.handleChange}
              min="2018-10-01" />
            <div className="errorMsg">{this.state.errors.departing}</div>
          </Col>
          <Col sm={{ size: 3 }}>
            <Label>Returning</Label>
            <Input 
              type="date"
              name="returning"
              placeHolder="mm/dd/yyyy" 
              value={this.state.returning} 
              onChange={this.handleChange} 
              min="2018-10-01" />
            <div className="errorMsg">{this.state.errors.returning}</div>
          </Col>
          <Col xs="1"> 
            <FormGroup>
              <Label>Adults(18+)</Label>
              <Input 
                type="select" 
                name="adults" 
                value={this.state.adults}
                onChange={this.handleChange}>
                {this.numberOptions()}
              </Input>
              <div className="errorMsg">{this.state.errors.adults}</div>
            </FormGroup>
          </Col>
          <Col xs="1.5">
            <FormGroup>
              <Label>Children (0-17)</Label>
              <Input 
                type="select" 
                name="children" 
                value={this.state.children}
                onChange={this.handleChange}>
                {this.numberOptions()}
              </Input>
              <div className="errorMsg">{this.state.errors.children}</div>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col sm={{ size: 2, offset: 1 }}>
            <Button
              color="danger" 
              type="submit" 
              className="button"  
              value="Register">Submit</Button>
          </Col>
        </Row>
      </Form>

    )
  }
}

export default AirplaneForm