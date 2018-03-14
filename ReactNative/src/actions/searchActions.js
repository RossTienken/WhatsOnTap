import axios from 'axios'
import { Actions } from 'react-native-router-flux'
import { apiKey } from '../../firebaseConfig'
import { labs } from '../../default'


import { LOADING_TRUE, LOADING_FALSE, SEARCH_CHANGED, SEARCH_BEERS, SEARCH_BREWERIES, SEARCH_LOCAL, ZIP_CHANGED  } from './types'

export const searchChanged = (text) => {
  return {
    type: SEARCH_CHANGED,
    payload: text
  }
}

// ZIP ACTIONS //

export const zipChanged = (text) => {
  return {
    type: ZIP_CHANGED,
    payload: text
  }
}

export const searchLocal = (zipCode) => {
  let zip = parseInt(zipCode)
  let breweriesFiltered
  axios.get(`https://www.zipcodeapi.com/rest/U0TbVzcpXEiHWVtND365I6iDWFJjAQnolonrdqRVuHRiOSgDDz2RbG8Zi0eEvdL4/radius.json/${zip}/7/mile?minimal`)
    .then(zipData => {
      let zips = zipData.data.zip_codes
      axios.get('http://localhost:3000/breweries')
        .then(response => {
          breweriesFiltered = response.data.filter(brew => {
            return (zipCodes.includes(brew.code))
          })
          dispatch({
            type: SEARCH_LOCAL,
            payload: { breweriesFiltered }
          })
        })
        .catch( error => {
          console.log('error from apiGetRequest ==>', error);
        })
    })
    .catch( error => {
      console.log('error from apiGetRequest ==>', error);
    })
}

export const searchBarInput = (text, zipCodes) => {
  return (dispatch)=>{
    let beersFiltered
    let labels = {}
    let brewNames = {}

    axios.get('http://localhost:3000/beers')
      .then(response => {
        beersFiltered = response.data.filter(beer => {
          return (beer.name.toLowerCase().includes(text.toLowerCase()))
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
