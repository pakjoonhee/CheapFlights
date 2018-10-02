import { FETCH_POSTS, token, end } from './types'
import axios from 'axios'


export const fetchPosts = (data) => dispatch => {


   const airlineCodeResponse = []
   const secondCall = (code) => { 
    return axios.get('https://api-crt.cert.havail.sabre.com/v1/lists/utilities/airlines?airlinecode=' + code, {
            headers: { 'Authorization': 'Bearer ' + token }
        }).then(response => {return response})
            .catch(error => alert(error))   
    }
    
  let base = 'https://api-crt.cert.havail.sabre.com/v1/shop/flights'
  let origin = '?origin=' + data.flyingFrom
  let destination = '&destination=' + data.flyingTo
  let departureDate = '&departuredate=' + data.departing
  let returnDate = '&returndate=' + data.returning
  let passengers = '&passengercount=' + (parseInt(data.children) + parseInt(data.adults))
  let axiosString = base + origin + destination + departureDate + returnDate + end + passengers


  axios.get(axiosString,{
    headers: { 'Authorization': 'Bearer ' + token }
  }).then((response) => {
    const jsonData = response.data.PricedItineraries
    const promises = jsonData.map((levelOne) => {
        const firstPromise = levelOne.AirItinerary.OriginDestinationOptions.OriginDestinationOption.map((levelTwo) => { 
        const secondPromise = levelTwo.FlightSegment.map((levelThree) => {
            const hasNoKey = secondCall(levelThree.MarketingAirline.Code)
            const axiosCall = (methodCall) => {
              return methodCall
              .then((response) => {
                  return {
                  airlineName: response.data.AirlineInfo,
                  flightDetails: levelThree,
                  totalFlightTime: levelTwo.ElapsedTime,
                  totalFareTotals: levelOne.AirItineraryPricingInfo.ItinTotalFare
                  }
              })
            }

             if(airlineCodeResponse.length === 0) {
             airlineCodeResponse.push({[levelThree.MarketingAirline.Code]:secondCall(levelThree.MarketingAirline.Code)})
            axiosCall(hasNoKey)

             } else if(!airlineCodeResponse[0].hasOwnProperty(levelThree.MarketingAirline.Code)) {
            airlineCodeResponse[0][levelThree.MarketingAirline.Code] = secondCall(levelThree.MarketingAirline.Code)
            axiosCall(hasNoKey)
            }
            
            let keys = Object.keys(airlineCodeResponse[0])
            for(let j=0; j<keys.length; j++) {
              if(levelThree.MarketingAirline.Code === keys[j]) {
                return airlineCodeResponse[0][levelThree.MarketingAirline.Code]
                .then((response) => {
                  return {
                      airlineName: response.data.AirlineInfo,
                      flightDetails: levelThree,
                      totalFlightTime: levelTwo.ElapsedTime,
                      totalFareTotals: levelOne.AirItineraryPricingInfo.ItinTotalFare
                  }
                })
              }
            }
          })
          return Promise.all(secondPromise)
        })
        return Promise.all(firstPromise)
    })
    return Promise.all(promises)
    }).then(posts =>
      dispatch({
        type: FETCH_POSTS,
        payload: posts
      })
    );
};

