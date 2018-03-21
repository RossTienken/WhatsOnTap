import React, { Component } from 'react'
import {View, Text, Button, StatusBar } from 'react-native'
import { Scene, Router, Actions } from 'react-native-router-flux'

import { Container, Header, Content, Tab, Tabs, TabHeading, Icon, StyleProvider } from 'native-base'

import getTheme from '../../native-base-theme/components'
import platform from '../../native-base-theme/variables/platform'

import SearchNav from './SearchNav'
import ResultsLocal from './ResultsLocal'
import Logout from './Logout'

class TabNavLocal extends Component {
  render(){
    return(
      <StyleProvider style={getTheme(platform)}>
        <Container>
          <StatusBar hidden={true} />
          <Tabs
            tabBarUnderlineStyle={{backgroundColor:'gold'}}
            initialPage={0}
            tabBarPosition='bottom'
          >
          <Tab heading={<TabHeading><Icon style={styles.mugStyle} name="ios-beer-outline" /><Text style={styles.textStyle}>Results</Text></TabHeading>} tabStyle={{backgroundColor: '#000'}}>
            <ResultsLocal />
          </Tab>
          <Tab heading={<TabHeading><Icon style={styles.searchStyle} name="ios-search" /><Text style={styles.textStyle}>Search</Text></TabHeading>} tabStyle={{backgroundColor: '#000'}}>
            <SearchNav />
          </Tab>
          <Tab heading={<TabHeading><Icon style={styles.searchStyle} name="log-out" /><Text style={styles.textStyle}>Logout</Text></TabHeading>} tabStyle={{backgroundColor: '#000'}}>
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
    color:'gold',
    fontSize: 30
  },
  textStyle:{
    color: 'white',
    fontSize: 20,
    marginLeft: 10
  }
}

export default TabNavLocal
