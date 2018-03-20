import React, { Component } from 'react'
import { Container, Header, Content, Icon} from 'native-base'
import { SearchBar } from 'react-native-elements'
import { View, Text, FlatList, Image, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import  axios  from 'axios'
import { Button, Spinner } from './common'
import { loadingTrue, logout } from '../actions'

class Logout extends Component {

  componentWillMount = () => {
  }

  onButtonPress = () => {
    this.props.loadingTrue()
    this.props.logout()
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
          Logout
        </Button>
      )
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
      <Image style={{ height: '100%', width: '100%', position:'absolute'}} source={require('../../public/img/logoutBack.png')} />
      <Image style={{ height: '100%',
                      width: '100%',
                      position:'absolute',
                      opacity: 0.65 }}
        source={{ uri: 'https://community.avid.com/cfs-filesystemfile.ashx/__key/CommunityServer.Components.PostAttachments/00.00.60.24.69/Sequence-01_5F00_1.jpg' }}
        />
        <Text style={{alignSelf:'center', textAlign:'center', fontSize:40, marginTop:85, marginBottom:20, fontWeight:'bold', color:'#e6e6e6', backgroundColor:'transparent'}}>{"Logout"}</Text>
        <Image
        style={{width:200,height:200, alignSelf:'center', marginBottom:20, marginTop:10}}
        source={require('../../mugEmpty.png')}
        />
        <View style={styles.viewStyle}>
          { this.renderButton() }
        </View>
      </KeyboardAvoidingView>
    )
  }
}

mapStateToProps = state => {
  const { loading } = state.auth
  return {
    loading
  }
}
export default connect(mapStateToProps, { loadingTrue, logout })(Logout)

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
