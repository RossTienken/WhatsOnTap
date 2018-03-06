import { AppRegistry } from 'react-native'
import App from './src/App'
import firebase from 'firebase'
import { config } from './firebaseConfig'

firebase.initializeApp(config)

AppRegistry.registerComponent('react_native_redux_firebase_boilerplate', () => App)
