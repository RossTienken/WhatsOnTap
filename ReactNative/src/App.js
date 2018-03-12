import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import firebase from 'firebase'
import ReduxThunk from 'redux-thunk'
import reducers from './reducers'
import config from '../firebaseConfig'


import LoginForm from './components/LoginForm'
import FluxRouter from './components/FluxRouter'

class App extends Component {
  componentWillMount(){
    if (!firebase.apps.length) {
      firebase.initializeApp(config)
    }
  }

  render() {
    console.disableYellowBox = true
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))
    return (
      <Provider store={ store }>
        <FluxRouter />
      </Provider>
    )
  }
}

export default App
