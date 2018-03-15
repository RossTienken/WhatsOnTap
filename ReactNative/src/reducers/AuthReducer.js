import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER, LOADING_TRUE, LOADING_FALSE, LOGOUT } from '../actions/types'

const INITIAL_STATE = {
  token: '',
  email: 'ross@ross.com',
  password: 'password',
  userID: null,
  error: '',
  loading: false,
  searchText: 'mod'
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type){
    case EMAIL_CHANGED:
    return { ...state, email: action.payload }
    case PASSWORD_CHANGED:
    return { ...state, password: action.payload }
    case LOGIN_USER_SUCCESS:
    return { ...INITIAL_STATE, userID: action.payload.userID, token:action.payload.token, error: '', loading:false }
    case LOGIN_USER_FAIL:
    return { ...state, error: 'Authentication Failed.', loading:false }
    case LOGIN_USER:
    return {...state, loading: true, error: '',}
    case LOADING_TRUE:
    return {...state, loading: true}
    case LOADING_FALSE:
    return {...state, loading: false}
    case LOGOUT:
    return {...state, ...INITIAL_STATE}
    default:
     return state
  }
}
