import { FETCH_POSTS, NEW_POST } from './types'
import axios from 'axios'


export const fetchPosts = () => dispatch => {
   const airlineCodeResponse = []
   const secondCall = (code) => { 
    return axios.get('https://api-crt.cert.havail.sabre.com/v1/lists/utilities/airlines?airlinecode=' + code, {
            headers: { 'Authorization': 'Bearer ' + token }
        }).then(response => {return response})
            .catch(error => alert(error))   
    }

  console.log("fetching")
  const token = 'T1RLAQIikSLk/X3NsiAxQUkkzIdhruv0/RCm7y/PibFW9Ruazl5fGqn8AADAnqyn/E/AoZiArLmjdzBahTox2lu0pHjlOGwQJytWBtVDPafnkLEv705CPyH2B16bqO/ZSzOCI3kpvgnSHKJVw8QRRsRefUMlBWs6tz54P6RYlbSb98FSOF/gIwjj58O+pq2/Zoc5mRxFYdxuuFdO7wJj2+Zz6B98WmEm3aHlKjxlZ+mLmO/ts2BFM2qJwAn/m1au5tN4DOE4HSxMddFHNPddZ0fG3pr5owYA3Gd0yAx8iqnaypJhe7zMawiM8qsj';
  axios.get('https://api-crt.cert.havail.sabre.com/v1/shop/flights?origin=JFK&destination=ICN&departuredate=2018-10-07&returndate=2018-10-09&onlineitinerariesonly=N&limit=30&offset=1&eticketsonly=N&sortby=totalfare&order=asc&sortby2=departuretime&order2=asc&pointofsalecountry=US' ,{
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
      }, console.log(posts))
    );
};

