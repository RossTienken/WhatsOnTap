import React, { Component } from 'react'
import {View, Text, Button } from 'react-native'
import { Scene, Router, Actions } from 'react-native-router-flux'

import { Container, Header, Content, Tab, Tabs, TabHeading, Icon, StyleProvider } from 'native-base'

import getTheme from '../../native-base-theme/components'
import platform from '../../native-base-theme/variables/platform'

import Search from './Search'
import Results from './Results'
import Logout from './Logout'

class TabNavigator extends Component {
  render(){
    return(
      <StyleProvider style={getTheme(platform)}>
        <Container>
          <Tabs
            tabBarUnderlineStyle={{backgroundColor:'gold'}}
            initialPage={0}
            tabBarPosition='bottom'
          >
          <Tab heading={<TabHeading><Icon style={styles.mugStyle} name="ios-beer-outline" /></TabHeading>} tabStyle={{backgroundColor: '#000'}}>
            <Results />
          </Tab>
          <Tab heading={<TabHeading><Icon style={styles.searchStyle} name="ios-search" /></TabHeading>} tabStyle={{backgroundColor: '#000'}}>
            <Search />
          </Tab>
          <Tab heading={<TabHeading><Icon style={styles.searchStyle} name="log-out" /></TabHeading>} tabStyle={{backgroundColor: '#000'}}>
            <Logout />
          </Tab>
       </Tabs>
      </Container>
    </StyleProvider>
    )
  }
}

const styles ={
  searchStyle:{
    color:'white'
  },
  mugStyle:{
    color:'gold'
  }
}

export default TabNavigator
