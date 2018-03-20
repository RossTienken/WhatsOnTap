import { SEARCH_BEERS, SEARCH_BREWERIES, SEARCH_LOCAL, SEARCH_CHANGED, ZIP_CHANGED, LOADING_TRUE, LOADING_FALSE, SELECT_BEER_ID, SELECT_BREW_ID, SELECT_LOCAL_ID } from '../actions/types'

import { labs } from '../../default'

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
  beerList: '',
  selectedBeerId: '',
  selectedBrewId: '',
  selectedLocalId: ''
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
    return { ...state, filteredBreweries: action.payload.breweriesFiltered, beerList: action.payload.beerList }
    case SEARCH_LOCAL:
    return { ...state, filteredLocal: action.payload.localFiltered, beerList: action.payload.beerList }
    case SELECT_BEER_ID:
    return {...state, selectedBeerId: action.payload}
    case SELECT_BREW_ID:
    return {...state, selectedBrewId: action.payload}
    case SELECT_LOCAL_ID:
    return {...state, selectedLocalId: action.payload}
    default:
      return state
  }
}
