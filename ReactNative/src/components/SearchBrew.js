import React, { Component } from 'react'
import { Container, Header, Content, Footer, FooterTab, Icon} from 'native-base';
import { SearchBar } from 'react-native-elements'
import { View, Text, FlatList, Image, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import  axios  from 'axios'
import { Card, CardSection, Input, InputNoLab, Button, Toolbar, RenderUserRow, Spinner } from './common'
import { loadingTrue, searchBreweries, searchChanged } from '../actions'

class SearchBrew extends Component {

  componentWillMount = () => {
  }

  onSearchChange = (text) => {
    this.props.searchChanged(text)
  }

  onButtonPress = () => {
    const { searchText } = this.props
    if(searchText !== '') {
      this.props.loadingTrue()
      this.props.searchBreweries(searchText)
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
      <Image style={{ height: '100%', width: '100%', position:'absolute'}} source={require('../../public/img/brewBack.png')} />
      <Image style={{ height: '100%',
                      width: '100%',
                      position:'absolute',
                      opacity: 0.75 }}
        source={{ uri: 'https://community.avid.com/cfs-filesystemfile.ashx/__key/CommunityServer.Components.PostAttachments/00.00.60.24.69/Sequence-01_5F00_1.jpg' }}
        />
      <ScrollView>
      <Text style={{alignSelf:'center', textAlign:'center', fontSize:35, marginTop:65, marginBottom:20, fontWeight:'bold', color:'#e6e6e6', backgroundColor:'transparent'}}>{"Search by Brewery!"}</Text>
        <CardSection style={{marginTop:15}}>
          <InputNoLab
            placeholder='Brewery Name'
            value={ this.props.searchText }
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
  const { loading, searchText } = state.search
  return {
    loading,
    searchText
  }
}
export default connect(mapStateToProps, { loadingTrue, searchBreweries, searchChanged })(SearchBrew)

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
