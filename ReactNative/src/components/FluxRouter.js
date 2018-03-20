import React from 'react'
import { Scene, Router, Actions } from 'react-native-router-flux'

import LoginForm from './LoginForm'
import TabNavBeer from './TabNavBeer'
import TabNavBrew from './TabNavBrew'
import TabNavLocal from './TabNavLocal'
import SearchNav from './SearchNav'

const FluxRouter=()=>{
  return (
    <Router>
      <Scene key='root' hideNavBar>
        <Scene
            hideNavBar
            navBar={null}
            key="login"
            component={ LoginForm }/>
        <Scene key="search"
          hideNavBar
          navBar={null}
          component={ SearchNav }
          />
        <Scene key="tabNavBeer"
          hideNavBar
          navBar={null}
          component={ TabNavBeer }
          />
        <Scene key="tabNavBrew"
          hideNavBar
          navBar={null}
          component={ TabNavBrew }
          />
        <Scene key="tabNavLocal"
          hideNavBar
          navBar={null}
          component={ TabNavLocal }
          />
      </Scene>
    </Router>
  )
}

export default FluxRouter
