import { SEARCH_BEERS, SEARCH_BREWERIES, SEARCH_LOCAL, SEARCH_CHANGED, ZIP_CHANGED, LOADING_TRUE, LOADING_FALSE } from '../actions/types'

import { filtBeer, filtBrew, labs, zipCs, filtBrewNames } from '../../default'

const INITIAL_STATE = {
  zipCode: '',
  zipCodes: zipCs,
  error: '',
  loading: false,
  filteredBeers: filtBeer,
  filteredBreweries: filtBrew,
  filteredLocal: filtBrew,
  searchText: '',
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
    console.log(action.payload)
    return { ...state, zipCode: action.payload }
    case SEARCH_BEERS:
    return { ...state, filteredBeers: action.payload.beersFiltered, labels: action.payload.labels, breweryNames: action.payload.brewNames, searchText: '' }
    case SEARCH_BREWERIES:
    return { ...state, filteredBeers: action.payload.beersFiltered, filteredBreweries: action.payload.breweriesFiltered, labels: action.payload.labels, breweryNames: action.payload.brewNames, searchText: '' }
    case SEARCH_LOCAL:
    return { ...state, filteredLocal: action.payload.localFiltered, labels: action.payload.labels }
    default:
     return state
  }
}
