import React, { Component } from 'react'
import { Container, Header, Content, Footer, FooterTab, Icon} from 'native-base';
import { SearchBar } from 'react-native-elements'
import { View, Text, ListView, Image, KeyboardAvoidingView, LayoutAnimation, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import  axios  from 'axios'
import { CardRes, Input, InputNoLab, Button, Toolbar, RenderUserRow } from './common'
import { selectBrewId } from '../actions'

class BrewListItem extends Component {

  componentWillMount = () => {
  }

  componentWillUpdate = () => {
    LayoutAnimation.easeInEaseOut()
  }

  getDataSource = (brewId) => {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    return ds.cloneWithRows(this.props.beerList[brewId])
  }

  isSelected = (id) => {
    if(this.props.selectedBrewId === id) {
      this.props.selectBrewId(id, true)
    }
    else {
      this.props.selectBrewId(id, false)
    }
  }

  renderRow(beer){
    const getABV = (item) => {
      if(item.abv !== 0) return item.abv
      return 5
    }
    return (
      <View style={styles.beerListStyle}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Name: </Text>
          <Text style={{ fontSize: 16 }}>{beer.name}  </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Abv: </Text>
          <Text style={{ fontSize: 16 }}>{getABV(beer)}%</Text>
        </View>
      </View>
    )
  }

  renderDescription(brewery){
    const { expanded, beerList } = this.props
    if(expanded) {
      if(!beerList[brewery.id]) {
        return (
          <View style={styles.descStyle}>
            <Text style = {{ fontSize: 18, fontWeight: 'bold' }}>No Further Details</Text>
          </View>
        )
      }
      else {
        return (
          <View style={styles.descStyle}>
            <Text style={{ marginLeft: 10, fontSize: 18, fontWeight: 'bold' }}>Current Beers:</Text>

            <ListView
              style={{ marginTop: 10 }}
              dataSource={ this.getDataSource(brewery.id) }
              renderRow={ this.renderRow }
            />
          </View>
        )
      }
    }
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
    const { id } = this.props.brewery
    const { brewery } = this.props
    return (
      <TouchableWithoutFeedback onPress={ () => this.isSelected(id) }>
        <View>
          <CardRes>
            <View>
              <Image style={{ height: '100%', width: '100%', position:'absolute'}} source={require('../../public/img/brewLab.png')} />
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
                              {brewery.name}
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
                                {brewery.city}
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
                                {brewery.country}
                                </Text>
              </View>
            </View>
          </CardRes>
          { this.renderDescription(brewery) }
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

mapStateToProps = (state, ownProps) => {
  const { filteredBreweries, beerList, selectedBrewId } = state.search
  const expanded = selectedBrewId === ownProps.brewery.id
  return {
    filteredBreweries,
    beerList,
    expanded,
    selectedBrewId
  }
}
export default connect(mapStateToProps, { selectBrewId })(BrewListItem)

const styles = {
  container:{
    flex:1,
    backgroundColor:'black',
  },
  descStyle : {
    borderRadius:5,
    margin:10,
    shadowOffset: {width: 5, height:5},
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    borderColor: '#ddd',
    position: 'relative',
  },
  beerListStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 3,
    paddingBottom: 3,
    borderTopWidth: 1,
    borderColor: 'black'
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
