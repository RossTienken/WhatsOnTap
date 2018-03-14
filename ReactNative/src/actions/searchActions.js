import axios from 'axios'
import { Actions } from 'react-native-router-flux'
import { apiKey } from '../../firebaseConfig'
import { labs } from '../../default'


import { SEARCH_CHANGED, SEARCH_BEERS, SEARCH_BREWERIES, LOADING_TRUE, LOADING_FALSE } from './types'

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
    let labels = {}
    let brewNames = {}

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
          /* get breweries for beers */
          axios.get(`http://localhost:3000/breweries/${beer.brewery_id}`)
            .then(response => {
              brewNames[beer.id] = response.data.name
            })
            .catch( error => {
              console.log('error from apiGetRequest ==>', error)
            })
          /* get beer labels */
          let remIPA = beer.name.replace(' IPA','')
          let name = encodeURIComponent(remIPA.trim())
          axios.get(`https://api.brewerydb.com/v2/beers?name=${name}&key=${apiKey.key}`)
            .then(brewDB => {
              if(!brewDB.data.data[0].labels.large) {
                labels[beer.id] = 'https://cdn.pixabay.com/photo/2012/04/13/00/58/hops-31495_960_720.png'
              }
              labels[beer.id] = brewDB.data.data[0].labels.large
            })
            .catch( error => {
              labels[beer.id] = labs[beer.id]
            })
        })
      })
      .then(() => {
        timedDispatch(dispatch, beersFiltered, breweriesFiltered, labels, brewNames)
      })
      .catch( error => {
        console.log('error from apiGetRequest ==>', error);
      })
  }
}

const timedDispatch = (dispatch, beersFiltered, breweriesFiltered, labels, brewNames) => {
  dispatch({
    type: SEARCH_BEERS,
    payload: { beersFiltered, breweriesFiltered, labels, brewNames }
  })
  setTimeout(() => {
    Actions.tabNavigator()
    Actions.refresh({ key: 'Search' })
    dispatch({ type: LOADING_FALSE })
  }, 2000)
}

export const loadingTrue = () => {
  return (dispatch) => {
    dispatch({ type: LOADING_TRUE })
  }
}
