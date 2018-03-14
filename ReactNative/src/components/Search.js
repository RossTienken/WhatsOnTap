import React, { Component } from 'react'
import { Container, Header, Content, Footer, FooterTab, Icon} from 'native-base';
import { SearchBar } from 'react-native-elements'
import { View, Text, FlatList, Image, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import  axios  from 'axios'
import { Card, CardSection, Input, InputNoLab, Button, Toolbar, RenderUserRow, Spinner } from './common'
import { loadingTrue, searchBarInput, searchChanged, zipChanged } from '../actions'

class Search extends Component {

  componentWillMount = () => {
  }

  onSearchChange = (text) => {
    this.props.searchChanged(text)
  }

  onButtonPress = () => {
    const { searchText, zipCodes } = this.props
    this.props.loadingTrue()
    this.props.searchBarInput(searchText, zipCodes)
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

  renderButton = () => {
    if(this.props.loading){
      return (
        <Spinner size='large'/>
      )
    } else {
      return (
        <Button onPress={ this.onButtonPress }>
          Search
        </Button>
      )
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
      <ScrollView>
      <Text style={{alignSelf:'center', textAlign:'center', fontSize:40, marginTop:65, marginBottom:20, fontWeight:'bold', color:'#e6e6e6'}}>{"Search by Beer or Brewery!"}</Text>
        <CardSection style={{marginTop:15}}>
          <InputNoLab
            placeholder='Beer or Brewery'
            value={this.props.searchText}
            onChangeText ={ this.onSearchChange }
          />
        </CardSection>
        <View style={styles.viewStyle}>
          { this.renderButton() }
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    )
  }
}

mapStateToProps = state => {
  const { loading, searchText, zipCode, zipCodes, token } = state.auth
  return {
    loading,
    searchText,
    zipCode,
    zipCodes,
    token
  }
}
export default connect(mapStateToProps, { loadingTrue, searchBarInput, searchChanged, zipChanged })(Search)

const styles = {
  container:{
    flex:1,
    backgroundColor:'#505050',
  },
  errorTextStyle:{
    fontSize: 20,
    alignSelf: 'center',
    color:'red',
  },
  viewStyle:{
    marginTop:5,
    marginBottom:5,
    paddingTop: 5,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
    marginLeft:25,
    marginRight:25
  }
}
