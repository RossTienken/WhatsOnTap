import React, { Component } from 'react'
import { Container, Header, Content, Icon} from 'native-base'
import { SearchBar } from 'react-native-elements'
import { View, Text, Image, KeyboardAvoidingView, LayoutAnimation, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import  axios  from 'axios'
import { CardRes, Input, InputNoLab, Button, Toolbar, RenderUserRow } from './common'
import { selectBeerId } from '../actions'



class BeerListItem extends Component {

  componentWillMount = () => {
  }

  componentWillUpdate = () => {
    LayoutAnimation.easeInEaseOut()
  }

  getLabel = (item) => {
    let id = item.id
    if(!this.props.labels[id]) return 'https://cdn.pixabay.com/photo/2012/04/13/00/58/hops-31495_960_720.png'
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

  isSelected = (id) => {
    if(this.props.selectedBeerId === id) {
      this.props.selectBeerId(id, true)
    }
    else {
      this.props.selectBeerId(id, false)
    }
  }

  renderDescription(){
    const { beer, expanded } = this.props
    if(expanded) {
      if(!beer.descript) {
        return (
          <View style={styles.descStyle}>
            <Text style = {{ fontSize: 18, fontWeight: 'bold' }}>No Further Details</Text>
          </View>
        )
      }
      else {
        return (
          <View style={styles.descStyle}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Details:</Text>
            <Text style={{ fontSize: 16 }}>{beer.descript}</Text>
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
    const { id } = this.props.beer
    const { beer } = this.props
    return (
      <TouchableWithoutFeedback onPress={ () => this.isSelected(id) }>
        <View>
          <CardRes>
            <View>
              <Image style={{ height: '100%', width: '100%', position:'absolute'}} source={{ uri: this.getLabel(beer) }} />
              <Image style={{ height: '100%',
                              width: '100%',
                              position:'absolute',
                              opacity: 0.7 }}
                source={{ uri: 'https://community.avid.com/cfs-filesystemfile.ashx/__key/CommunityServer.Components.PostAttachments/00.00.60.24.69/Sequence-01_5F00_1.jpg' }}
                />
              <Text style={{ color:'white',
                              fontSize:22,
                              fontWeight: 'bold',
                              margin:10,
                              backgroundColor: 'transparent'}}>
                              {beer.name}
                              </Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color:'white',
                                fontSize:17,
                                fontWeight: 'bold',
                                margin:5,
                                backgroundColor:'transparent'}}>
                                Brewery:
                                </Text>
                <Text style={{ color:'white',
                                fontSize:17,
                                fontWeight: 'bold',
                                margin:5,
                                backgroundColor:'transparent'}}>
                                {this.getBrewery(beer)}
                                </Text>
              </View>
              <Text style={{ color:'white',
                              fontSize:17,
                              fontWeight: 'bold',
                              margin:5,
                              backgroundColor:'transparent'}}>abv:  {this.getABV(beer)}%</Text>
            </View>
          </CardRes>
          { this.renderDescription(beer) }
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

mapStateToProps = (state, ownProps) => {
  const { breweryNames, filteredBeers, labels, selectedBeerId } = state.search
  const expanded = selectedBeerId === ownProps.beer.id
  return {
    breweryNames,
    labels,
    expanded,
    selectedBeerId
  }
}
export default connect(mapStateToProps, { selectBeerId })(BeerListItem)

const styles = {
  container:{
    flex:1,
    backgroundColor:'black',
  },
  descStyle : {
    borderRadius:5,
    margin:10,
    padding: 10,
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
