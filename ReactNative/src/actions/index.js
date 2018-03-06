import firebase from 'firebase'

import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
} from './types'

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  }
}

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  }
}

// return (dispatch) is from thunk
export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type:LOGIN_USER })
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then( user => { firebase.auth().currentUser.getIdToken(true)
      .then(token => {
        apiGetRequest(dispatch, token)
      })
    })
    .catch((error)=>{
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => { firebase.auth().currentUser.getIdToken(true)
        .then(token => {
          apiPostRequest(dispatch, token)
        })
      })
      .catch(() => loginUserFail(dispatch))
    })
  }
}

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL })
}

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  })
}
