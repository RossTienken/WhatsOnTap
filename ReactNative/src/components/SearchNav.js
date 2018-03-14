import React, { Component } from 'react'
import {View, Text, Button } from 'react-native'
import { Scene, Router, Actions } from 'react-native-router-flux'

import { Container, Header, Content, Tab, Tabs, TabHeading, Title, Icon, StyleProvider } from 'native-base'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import getTheme from '../../native-base-theme/components'
import platform from '../../native-base-theme/variables/platform'

import SearchBeer from './SearchBeer'
import SearchBrew from './SearchBrew'
import SearchLocal from './SearchLocal'

class SearchNav extends Component {
  render(){
    return(
      <StyleProvider style={getTheme(platform)}>
        <Container>
          <Header hasTabs style={{ backgroundColor: 'black'}}>
            <Title style={styles.headerTitle}>Search By...</Title>
          </Header>
          <Tabs
            tabBarUnderlineStyle={{backgroundColor:'gold'}}
            initialPage={0}
            tabBarPosition='top'
          >
          <Tab heading={<TabHeading><MaterialCommunityIcons name="beer" size={25} style={styles.iconStyle} /><Text style={styles.textStyle}>Beer</Text></TabHeading>} tabStyle={{backgroundColor: '#000'}}>
            <SearchBeer />
          </Tab>
          <Tab heading={<TabHeading><MaterialCommunityIcons name='hops' size={25} style={styles.iconStyle} /><Text style={styles.textStyle}>Brewery</Text></TabHeading>} tabStyle={{backgroundColor: '#000'}}>
            <SearchBrew />
          </Tab>
          <Tab heading={<TabHeading><MaterialCommunityIcons name="google-maps" size={25} style={styles.iconStyle} /><Text style={styles.textStyle}>Local</Text></TabHeading>} tabStyle={{backgroundColor: '#000'}}>
            <SearchLocal />
          </Tab>
       </Tabs>
      </Container>
    </StyleProvider>
    )
  }
}

const styles ={
  iconStyle:{
    color:'gold',
  },
  headerTitle:{
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 15
  },
  textStyle:{
    color: 'white',
    fontSize: 20,
    marginLeft: 10
  }
}

export default SearchNav
