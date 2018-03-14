import { SEARCH_BEERS, SEARCH_BREWERIES, SEARCH_LOCAL, SEARCH_CHANGED, ZIP_CHANGED, LOADING_TRUE, LOADING_FALSE } from '../actions/types'

import { filtBeer, filtBrew, labs, zipCs, filtBrewNames } from '../../default'

const INITIAL_STATE = {
  zipCode: '80301',
  zipCodes: zipCs,
  error: '',
  loading: false,
  filteredBeers: filtBeer,
  filteredBreweries: filtBrew,
  searchText: 'mod',
  labels: labs,
  breweryNames: filtBrewNames
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type){
    case LOADING_TRUE:
    return {...state, loading: true}
    case LOADING_FALSE:
    return {...state, loading: false}
    case SEARCH_CHANGED:
    return { ...state, searchText: action.payload }
    case ZIP_CHANGED:
    return { ...state, zipCode: action.payload }
    case SEARCH_BEERS:
    return { ...state, filteredBeers: action.payload.beersFiltered, filteredBreweries: action.payload.breweriesFiltered, labels: action.payload.labels, breweryNames: action.payload.brewNames }
    case SEARCH_BREWERIES:
    return { ...state, filteredBeers: action.payload.beersFiltered, filteredBreweries: action.payload.breweriesFiltered, labels: action.payload.labels, breweryNames: action.payload.brewNames }
    case SEARCH_LOCAL:
    return { ...state, filteredBeers: action.payload.beersFiltered, filteredBreweries: action.payload.breweriesFiltered, labels: action.payload.labels, breweryNames: action.payload.brewNames }
    default:
     return state
  }
}
