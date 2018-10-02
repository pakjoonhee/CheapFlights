import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {fetchPosts} from '../.././actions/postActions'
import './AirplaneSearchResults.css'

class Posts extends Component {
  flightDetails = []

  componentDidMount() {
    console.log(this.props.history.location.data)
    this.props.fetchPosts(this.props.history.location.data.fields)
  }

  calculateHours = (minutes) => {
    let hours = (minutes / 60)
    let mins = (minutes % 60)
    return Math.round(hours) + " Hours " + mins + " Mins";
    }
    
  popArray = (array) => {
  let cities = "";
  for(let i=0; i<array.length - 1; i++) {
      cities += array[i].arrivalAirport + " "
  }
  return cities;
  }
  
  countFlightSegment = (num) => {
  if(num === 1) {
      return "nonstop"
    } else {
        if(num - 1 === 1) {
        return 1 + " Stop"
        } else {
        return (num - 1) + " Stops"
        }
    }
  }
  
  isMultiCarrier = (airlineNames) => {
    for(let i=1; i<airlineNames.length; i++) {
        if(airlineNames[i].airlineName !== airlineNames[i-1].airlineName) {
        return "Multiple Airlines"
        }
    }
    return airlineNames[0].airlineName;
  }
  
  pushFlightDetails = (departureDateTime, arrivalDateTime, 
  airlineName, departureAirport, arrivalAirport) => {
      this.flightDetails.push({departureDateTime:departureDateTime, arrivalDateTime:arrivalDateTime,
      airlineName:airlineName, departureAirport:departureAirport, arrivalAirport:arrivalAirport})
  }
  
  render() {
    let details = this.props.posts
    const airlineDetails = details.map((levelOne) => {

      return (
        <div className="container">
          {
            levelOne.map((levelTwo) => {
              return (
                <div>
                  {
                    levelTwo.map((levelThree) => {
                      return (
                        <div>
                          {
                            this.pushFlightDetails(
                              levelThree.flightDetails.DepartureDateTime.split("T").pop(),
                              levelThree.flightDetails.ArrivalDateTime.split("T").pop(),
                              levelThree.airlineName[0].AirlineName,
                              levelThree.flightDetails.DepartureAirport.LocationCode,
                              levelThree.flightDetails.ArrivalAirport.LocationCode )
                          }
                        </div>
                        
                      )
                    })
                  }
                  <div className="left">
                    <div>{this.flightDetails[0].departureDateTime + "-" + this.flightDetails.slice(-1).pop().arrivalDateTime}</div>
                    <div>{this.isMultiCarrier(this.flightDetails)}</div>
                  </div>
                  <div className="left">
                    <div>{this.countFlightSegment(levelTwo.length) + " "} </div>
                    <div>{this.popArray(this.flightDetails)}</div>
                  </div>
                  <div className="left">
                    <div>{this.calculateHours(levelTwo[0].totalFlightTime)}</div>
                    <div>{this.flightDetails[0].departureAirport + "-" + this.flightDetails.slice(-1).pop().arrivalAirport}</div>
                  </div>

                  {this.flightDetails.length = []}
                </div>
              )
            })
          }
        </div>
      )
    })

      return (
        <div>
          {airlineDetails}
        </div>
      )
  }
}

Posts.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  newPost: PropTypes.object
};

const mapStateToProps = state => ({
  posts: state.posts.items,
  newPost: state.posts.item
});

export default connect(mapStateToProps, {fetchPosts})(Posts)