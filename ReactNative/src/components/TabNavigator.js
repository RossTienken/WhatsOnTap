import React, { Component } from 'react';
import {View, Text, Button } from 'react-native'
import { Scene, Router, Actions } from 'react-native-router-flux'

import { Container, Header, Content, Tab, Tabs, TabHeading, Icon } from 'native-base';

import Search from './Search';

class TabNavigator extends Component {
  render(){
    return(
      <Container>
        <Tabs
          tabBarUnderlineStyle={{backgroundColor:'transparent'}}
          initialPage={0}
          tabBarPosition='bottom'
        >
        <Tab heading="Search" tabStyle={{backgroundColor: '#08923e'}}>
          <Search />
        </Tab>
     </Tabs>
    </Container>
    )
  }
}

export default TabNavigator
