import axios from 'axios'
import { Actions } from 'react-native-router-flux'

import { SEARCH_CHANGED, SEARCH_BEERS, SEARCH_BREWERIES } from './types'

export const searchChanged = (text) => {
  return {
    type: SEARCH_CHANGED,
    payload: text
  }
}

export const searchBarInput = (text, zip) => {
  return (dispatch)=>{
    let beersFiltered
    let zipCodes
    axios.get('http://localhost:3000/beers')
      .then(response => {
        beersFiltered = response.data.filter(beer => {
          return (beer.name.toLowerCase().includes(text.toLowerCase()))
        })
        console.log(beersFiltered)
        return beersFiltered
      })
      .catch( error => {
        console.log('error from apiGetRequest ==>', error);
      })
      // axios.get(`https://www.zipcodeapi.com/rest/H7xRjkDn8Ec9JMuonKjS8J2ayTJLJZFWWGFxRRG8fUSeUxyMXAiKm7jaABikA4Z3/radius.json/${zip}/7/mile?minimal`)
      //   .then(response => {
      //     zipCodes = response.data
      //     console.log(zipCodes)
      //     return zipCodes
      //   })
      //   .catch( error => {
      //     console.log('error from apiGetRequest ==>', error);
      //   })
    dispatch({
      type: SEARCH_BEERS,
      payload: { beersFiltered, zipCodes }
    })
  }
}
