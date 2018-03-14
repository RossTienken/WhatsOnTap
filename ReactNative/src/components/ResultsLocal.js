import React, { Component } from 'react'
import { Container, Header, Content, Footer, FooterTab, Icon} from 'native-base';
import { SearchBar } from 'react-native-elements'
import { View, Text, FlatList, Image, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import  axios  from 'axios'
import { CardRes, Input, InputNoLab, Button, Toolbar, RenderUserRow } from './common'
import { } from '../actions'

class ResultsLocal extends Component {

  componentWillMount = () => {
    console.log(this.props)
  }

  getLabel = (item) => {
    let id = item.id
    return this.props.labels[id]
  }

  getBrewery = (item) => {
    let id = item.id
    return this.props.breweryNames[id]
  }

  getABV = (item) => {
    if(item.abv !== 0) return item.abv
    return 5
  }

  renderError = () => {
    if(this.props.error){
      return(
        <View style={{backgroundColor: 'transparent', marginBottom:10}}>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      )
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
      <ScrollView>
        <FlatList
          style={{ marginTop: 25 }}
          data={this.props.filteredLocal}
          renderItem={ ({item}) =>
          <CardRes>
            <View>
              <Image style={{ height: '100%', width: '100%', position:'absolute'}} source={ require('../../public/img/localLab.png') } />
              <Image style={{ height: '100%',
                              width: '100%',
                              position:'absolute',
                              opacity: 0.75 }}
                source={{ uri: 'https://community.avid.com/cfs-filesystemfile.ashx/__key/CommunityServer.Components.PostAttachments/00.00.60.24.69/Sequence-01_5F00_1.jpg' }}
                />
                <Text style={{ color:'white',
                                fontSize:22,
                                fontWeight: 'bold',
                                margin:10,
                                backgroundColor: 'transparent'}}>
                                {item.name}
                                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color:'white',
                                  fontSize:17,
                                  fontWeight: 'bold',
                                  margin:5,
                                  backgroundColor:'transparent'}}>
                                  City:
                                  </Text>
                  <Text style={{ color:'white',
                                  fontSize:17,
                                  fontWeight: 'bold',
                                  margin:5,
                                  backgroundColor:'transparent'}}>
                                  {item.city}
                                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color:'white',
                                  fontSize:17,
                                  fontWeight: 'bold',
                                  margin:5,
                                  backgroundColor:'transparent'}}>
                                  Country:
                                  </Text>
                  <Text style={{ color:'white',
                                  fontSize:17,
                                  fontWeight: 'bold',
                                  margin:5,
                                  backgroundColor:'transparent'}}>
                                  {item.country}
                                  </Text>
                </View>
            </View>
          </CardRes>
          }
          keyExtractor={(item, index) => index}
        />
      </ScrollView>
    </KeyboardAvoidingView>
    )
  }
}

mapStateToProps = state => {
  const { filteredLocal } = state.search
  return {
    filteredLocal
  }
}
export default connect(mapStateToProps, { })(ResultsLocal)

const styles = {
  container:{
    flex:1,
    backgroundColor:'black',
  },
  errorTextStyle:{
    fontSize: 20,
    alignSelf: 'center',
    color:'red',
  },
  headerContentStyle: {
    flexDirection:'row',
    flex:1,
    alignItems:'center',
    marginTop:10,
    marginBottom:10,
  },
  viewStyle:{
    marginTop:5,
    marginBottom:5,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative',
    marginLeft:25,
    marginRight:25
  }
}
