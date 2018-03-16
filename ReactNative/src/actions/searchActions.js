import axios from 'axios'
import { Actions } from 'react-native-router-flux'
import { apiKey } from '../../firebaseConfig'
import { labs } from '../../default'


import { LOADING_TRUE, LOADING_FALSE, SEARCH_CHANGED, SEARCH_BEERS, SEARCH_BREWERIES, SEARCH_LOCAL, ZIP_CHANGED, SELECT_BEER_ID, SELECT_BREW_ID, SELECT_LOCAL_ID } from './types'

export const searchChanged = (text) => {
  return {
    type: SEARCH_CHANGED,
    payload: text
  }
}

export const selectBeerId = (beerId) => {
  return {
    type: SELECT_BEER_ID,
    payload: beerId
  }
}

export const selectBrewId = (beerId) => {
  return {
    type: SELECT_BREW_ID,
    payload: beerId
  }
}

export const selectLocalId = (beerId) => {
  return {
    type: SELECT_LOCAL_ID,
    payload: beerId
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
  return (dispatch) => {
    let zip = parseInt(zipCode)
    let localFiltered
    let beerList = {}
    axios.get(`https://www.zipcodeapi.com/rest/3ppekBdM55qFBHQ8FzCg9DEoanf2uutG8a9uphfDtRl2GMHq8V9hWMT8JGflEIlX/radius.json/${zip}/15/mile?minimal`)
    .then(zipData => {
      let zipCodes = zipData.data.zip_codes
      axios.get('https://whats-on-tap-api.herokuapp.com/breweries')
      .then(response => {
        localFiltered = response.data.filter(brew => {
          return (zipCodes.includes(brew.code))
        })
        localFiltered.map(brewery => {
          axios.get('https://whats-on-tap-api.herokuapp.com/beers')
          .then(response => {
            beerList[brewery.id] = response.data.filter(beer => {
              return (beer.brewery_id === brewery.id)
            })
          })
        })
      })
      .then(() => {
        timedLocal(dispatch, localFiltered, beerList)
      })
      .catch( error => {
        console.log('error from apiGetRequest ==>', error);
      })
    })
    .catch( error => {
      console.log('error from apiGetRequest ==>', error);
    })
  }
}

export const searchBreweries = (text) => {
  return (dispatch) => {
    let breweriesFiltered
    let beerList = {}
    axios.get('https://whats-on-tap-api.herokuapp.com/breweries')
    .then(response => {
      breweriesFiltered = response.data.filter(brew => {
        return (brew.name.toLowerCase().includes(text.toLowerCase()))
      })
      breweriesFiltered.map(brewery => {
        axios.get('https://whats-on-tap-api.herokuapp.com/beers')
        .then(response => {
          beerList[brewery.id] = response.data.filter(beer => {
            return (beer.brewery_id === brewery.id)
          })
        })
      })
    })
    .then(() => {
      timedBrew(dispatch, breweriesFiltered, beerList)
    })
    .catch( error => {
      console.log('error from apiGetRequest ==>', error);
    })
  }
}

export const searchBeers = (text) => {
  return (dispatch)=>{
    let beersFiltered
    let labels = {}
    let brewNames = {}

    axios.get('https://whats-on-tap-api.herokuapp.com/beers')
      .then(response => {
        beersFiltered = response.data.filter(beer => {
          return (beer.name.toLowerCase().includes(text.toLowerCase()))
        })
        beersFiltered.map(beer => {
          /* get breweries for beers */
          axios.get(`https://whats-on-tap-api.herokuapp.com/breweries/${beer.brewery_id}`)
            .then(response => {
              brewNames[beer.id] = response.data.name
            })
            .catch( error => {
              console.log('error from apiGetRequest ==>', error)
            })
          /* get beer labels */
          let name = encodeURIComponent(beer.name.trim())
          name = name.replace("'", '%27')
          /* Use apiKey for actual api search*/
          axios.get(`https://api.brewerydb.com/v2/beers?name=${name}&key=${apiKey}`)
            .then(brewDB => {
              if(!brewDB.data.data[0].labels.large) {
                labels[beer.id] = 'https://cdn.pixabay.com/photo/2012/04/13/00/58/hops-31495_960_720.png'
              }
              else {
                labels[beer.id] = brewDB.data.data[0].labels.large
              }
            })
            .catch( error => {
              labels[beer.id] = labs[beer.id]
            })
        })
      })
      .then(() => {
        timedBeers(dispatch, beersFiltered, labels, brewNames)
      })
      .catch( error => {
        console.log('error from apiGetRequest ==>', error);
      })
  }
}

const timedBeers = (dispatch, beersFiltered, labels, brewNames) => {
  dispatch({
    type: SEARCH_BEERS,
    payload: { beersFiltered, labels, brewNames }
  })
  setTimeout(() => {
    Actions.tabNavBeer()
    Actions.refresh({ key: 'search' })
    dispatch({ type: LOADING_FALSE })
  }, 2000)
}

const timedBrew = (dispatch, breweriesFiltered, beerList) => {
  dispatch({
    type: SEARCH_BREWERIES,
    payload: { breweriesFiltered, beerList }
  })
  setTimeout(() => {
    Actions.tabNavBrew()
    Actions.refresh({ key: 'search' })
    dispatch({ type: LOADING_FALSE })
  }, 2000)
}

const timedLocal = (dispatch, localFiltered, beerList) => {
  dispatch({
    type: SEARCH_LOCAL,
    payload: { localFiltered, beerList }
  })
  setTimeout(() => {
    Actions.tabNavLocal()
    Actions.refresh({ key: 'search' })
    dispatch({ type: LOADING_FALSE })
  }, 2000)
}

export const loadingTrue = () => {
  return (dispatch) => {
    dispatch({ type: LOADING_TRUE })
  }
}
