import React from 'react'
import { Scene, Router, Actions } from 'react-native-router-flux'

import LoginForm from './LoginForm'
import TabNavigator from './TabNavigator'
import SearchBeer from './SearchBeer'

const FluxRouter=()=>{
  return (
    <Router>
      <Scene key='root' hideNavBar>
        <Scene key="tabNavigator"
          hideNavBar
          navBar={null}
          component={ TabNavigator }
          />
        <Scene
            hideNavBar
            navBar={null}
            key="login"
            component={ LoginForm }/>
        <Scene key="search"
          hideNavBar
          navBar={null}
          component={ SearchBeer }
          />
      </Scene>
    </Router>
  )
}

export default FluxRouter
