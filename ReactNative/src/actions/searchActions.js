import axios from 'axios'
import { Actions } from 'react-native-router-flux'
import { apiKey } from '../../firebaseConfig'

import { SEARCH_CHANGED, SEARCH_BEERS, SEARCH_BREWERIES } from './types'

export const searchChanged = (text) => {
  return {
    type: SEARCH_CHANGED,
    payload: text
  }
}

export const searchBarInput = (text, zipCodes) => {
  return (dispatch)=>{
    let beersFiltered
    let breweriesFiltered
    let labels = { 0: 'https://cdn.pixabay.com/photo/2012/04/13/00/58/hops-31495_960_720.png'}
    
    axios.get('http://localhost:3000/beers')
      .then(response => {
        beersFiltered = response.data.filter(beer => {
          return (beer.name.toLowerCase().includes(text.toLowerCase()))
        })
        axios.get('http://localhost:3000/breweries')
          .then(response => {
            breweriesFiltered = response.data.filter(brew => {
              return (zipCodes.includes(brew.code))
            })
          })
          .catch( error => {
            console.log('error from apiGetRequest ==>', error);
          })
        beersFiltered.map(beer => {
          let remIPA = beer.name.replace(' IPA','')
          let name = encodeURIComponent(remIPA.trim())
          axios.get(`https://api.brewerydb.com/v2/beers?name=${name}&key=${apiKey.key}`)
            .then(brewDB => {
              if(brewDB.data.data[0].labels.large) {
                labels[beer.id] = brewDB.data.data[0].labels.large
              }
              dispatch({
                type: SEARCH_BEERS,
                payload: { beersFiltered, breweriesFiltered, labels }
              })
              Actions.tabNavigator()
            })
            .catch( error => {
              return
            })
        })
      })
      .catch( error => {
        console.log('error from apiGetRequest ==>', error);
      })
  }
}
