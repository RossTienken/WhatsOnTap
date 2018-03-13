import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER, SEARCH_BEERS, SEARCH_CHANGED, ZIP_CHANGED, GET_ZIPS, GET_LABELS } from '../actions/types'

import { filtBeer, filtBrew, labs, zipCs } from '../../default'

const INITIAL_STATE = {
  token: '',
  email: 'ross@ross.com',
  password: 'password',
  zipCode: '80301',
  zipCodes: zipCs,
  userID: null,
  error: '',
  loading: false,
  filteredBeers: filtBeer,
  filteredBreweries: filtBrew,
  searchText: 'mod',
  labels: labs
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type){
    case EMAIL_CHANGED:
    return { ...state, email: action.payload }
    case PASSWORD_CHANGED:
    return { ...state, password: action.payload }
    case LOGIN_USER_SUCCESS:
    return { ...INITIAL_STATE, userID: action.payload.userID, token:action.payload.token, error: '', loading:false, zipCodes: action.payload.zips }
    case LOGIN_USER_FAIL:
    return { ...state, error: 'Authentication Failed.', loading:false }
    case LOGIN_USER:
    return {...state, loading: true, error: '',}
    case SEARCH_CHANGED:
    return { ...state, searchText: action.payload }
    case ZIP_CHANGED:
    return { ...state, zipCode: action.payload }
    case SEARCH_BEERS:
    return { ...state, filteredBeers: action.payload.beersFiltered, filteredBreweries: action.payload.breweriesFiltered, labels: action.payload.labels }
    default:
     return state
  }
}
