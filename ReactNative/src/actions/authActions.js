import firebase from 'firebase'
import axios from 'axios'
import { Actions } from 'react-native-router-flux'

import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER } from './types'

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  }
}

export const passwordChanged = (text) =>{
  return {
    type: PASSWORD_CHANGED,
    payload: text
  }
}

const apiGetRequest = (dispatch, token) => {
  let getURL = `http://localhost:3000/users/${token}`
  axios.get(getURL, {headers:{ 'x-access-token':token }})
  .then(response => {
    let userID = response.data.id
    loginUserSuccess(dispatch, userID, token)
  })
  .catch( error => {
    console.log('error from apiGetRequest ==>', error);
  })
}

const apiPostRequest = (dispatch, token) => {
  let postURL = 'http://localhost:3000/users'
  let postBody = { token }
  axios.post(postURL, postBody, {headers:{'x-access-token':token}})
  .then(response => {
    let userID = response.data.id
    loginUserSuccess(dispatch, userID, token)
  })
  .catch( error => {
    console.log('error from apiPostRequest ==>', error);
  })
}

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

const loginUserSuccess = (dispatch, userID, token) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: { userID, token }
  })
  Actions.search()
}
