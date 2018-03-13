import firebase from 'firebase'
import axios from 'axios'
import { Actions } from 'react-native-router-flux'

import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER, SEARCH_CHANGED, SEARCH_BEERS, SEARCH_BREWERIES, ZIP_CHANGED } from './types'

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

const apiGetRequest = (dispatch, token, zipCode) => {
  let getURL = `http://localhost:3000/users/${token}`
  let zip = parseInt(zipCode)
  axios.get(getURL, {headers:{ 'x-access-token':token }})
  .then(response => {
    let userID = response.data.id
    axios.get(`https://www.zipcodeapi.com/rest/U0TbVzcpXEiHWVtND365I6iDWFJjAQnolonrdqRVuHRiOSgDDz2RbG8Zi0eEvdL4/radius.json/${zip}/7/mile?minimal`)
      .then(zipData => {
        let zips = zipData.data.zip_codes
        loginUserSuccess(dispatch, userID, token, zips)
      })
      .catch( error => {
        console.log('error from apiGetRequest ==>', error);
      })
  })
  .catch( error => {
    console.log('error from apiGetRequest ==>', error);
  })
}

const apiPostRequest = (dispatch, token, zipCode) => {
  let postURL = 'http://localhost:3000/users'
  let postBody = { token }
  let zip = parseInt(zipCode)
  axios.post(postURL, postBody, {headers:{'x-access-token':token}})
  .then(response => {
    let userID = response.data.id
    axios.get(`Request URL https://www.zipcodeapi.com/rest/U0TbVzcpXEiHWVtND365I6iDWFJjAQnolonrdqRVuHRiOSgDDz2RbG8Zi0eEvdL4/radius.json/${zip}/7/mile?minimal`)
      .then(zipData => {
        let zips = zipData.data.zip_codes
        loginUserSuccess(dispatch, userID, token, zips)
      })
      .catch( error => {
        console.log('error from apiGetRequest ==>', error);
      })
  })
  .catch( error => {
    console.log('error from apiPostRequest ==>', error);
  })
}

export const loginUser = ({ email, password, zipCode }) => {
  return (dispatch) => {
    dispatch({ type:LOGIN_USER })
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then( user => { firebase.auth().currentUser.getIdToken(true)
      .then(token => {
        apiGetRequest(dispatch, token, zipCode)
      })
    })
    .catch((error)=>{
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => { firebase.auth().currentUser.getIdToken(true)
        .then(token => {
          apiPostRequest(dispatch, token, zipCode)
        })
      })
      .catch(() => loginUserFail(dispatch))
    })
  }
}

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL })
}

const loginUserSuccess = (dispatch, userID, token, zips) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: { userID, token, zips }
  })
  Actions.search()
}

// ZIP ACTIONS //

export const zipChanged = (text) => {
  return {
    type: ZIP_CHANGED,
    payload: text
  }
}
