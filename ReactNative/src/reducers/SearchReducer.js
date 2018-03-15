import { SEARCH_BEERS, SEARCH_BREWERIES, SEARCH_LOCAL, SEARCH_CHANGED, ZIP_CHANGED, LOADING_TRUE, LOADING_FALSE, SELECT_BEER_ID } from '../actions/types'

import { filtBeer, filtBrew, labs, zipCs, filtBrewNames } from '../../default'

const INITIAL_STATE = {
  zipCode: '',
  zipCodes: '',
  error: '',
  loading: false,
  filteredBeers: '',
  filteredBreweries: '',
  filteredLocal: '',
  searchText: '',
  labels: labs,
  breweryNames: '',
  selectedBeerId: ''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type){
    case LOADING_TRUE:
    return {...state, loading: true}
    case LOADING_FALSE:
    return {...state, searchText: '', loading: false}
    case SEARCH_CHANGED:
    return { ...state, searchText: action.payload }
    case ZIP_CHANGED:
    return { ...state, zipCode: action.payload }
    case SEARCH_BEERS:
    return { ...state, filteredBeers: action.payload.beersFiltered, labels: action.payload.labels, breweryNames: action.payload.brewNames }
    case SEARCH_BREWERIES:
    return { ...state, filteredBreweries: action.payload.breweriesFiltered }
    case SEARCH_LOCAL:
    return { ...state, filteredLocal: action.payload.localFiltered }
    case SELECT_BEER_ID:
    return {...state, selectedBeerId: action.payload}
    default:
     return state
  }
}
