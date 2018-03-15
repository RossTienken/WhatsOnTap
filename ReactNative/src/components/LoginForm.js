import React, { Component } from 'react'
import {  View, KeyboardAvoidingView, ScrollView, Text, Image} from 'react-native'
import { connect } from 'react-redux'
import actions from 'react-native-router-flux'
import { CardSection, Input, Button, Spinner } from './common'
import { emailChanged, passwordChanged, loginUser, loginUserFail } from '../actions'

class LoginForm extends Component {

  onEmailChange(text){
    this.props.emailChanged(text)
  }

  onPasswordChange(text){
    this.props.passwordChanged(text)
  }

  onButtonPress(){
    const { email, password } = this.props
    this.props.loginUser({ email, password })
  }

  renderError(){
    if(this.props.error){
      return (
        <View style={{backgroundColor:'#505050'}}>
          <Text style={ styles.errorTextStyle }>
            { this.props.error }
          </Text>
        </View>
      )
    }
  }

  renderButton(){
    if(this.props.loading){
      return (
        <Spinner size='large'/>
      )
    } else {
      return (
        <Button onPress={ this.onButtonPress.bind(this) }>
          Login/Signup
        </Button>
      )
    }
  }

  render(){
    return(
      <KeyboardAvoidingView behavior={"padding"} style={styles.containerStyle}>
      <Image style={{ height: '100%', width: '100%', position:'absolute'}} source={require('../../public/img/loginBack.png')} />
      <Image style={{ height: '100%',
                      width: '100%',
                      position:'absolute',
                      opacity: 0.65 }}
        source={{ uri: 'https://community.avid.com/cfs-filesystemfile.ashx/__key/CommunityServer.Components.PostAttachments/00.00.60.24.69/Sequence-01_5F00_1.jpg' }}
        />
      <ScrollView>
      <Text style={{alignSelf:'center', fontSize:50, marginTop:85, fontWeight:'bold', color:'#e6e6e6', backgroundColor: 'transparent'}}>{"What's On Tap?"}</Text>
      <Image
      style={{width:200,height:200, alignSelf:'center', marginBottom:20, marginTop:10}}
      source={require('../../mug.png')}
      />
        <CardSection style={{marginTop:15}}>
          <Input
            label='Email'
            placeholder='email@gmail.com'
            placeholderTextColor='#cccccc'
            onChangeText ={ this.onEmailChange.bind(this) }
            value ={ this.props.email }
            />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            label='Password'
            placeholder='password'
            placeholderTextColor='#cccccc'
            onChangeText={ this.onPasswordChange.bind(this) }
            value ={ this.props.password }
            />
        </CardSection>
          { this.renderError() }
        <View style={styles.viewStyle}>
          { this.renderButton() }
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

mapStateToProps = state => {
  const { email, password, error, loading, zipCode, zipCodes } = state.auth
  return {
    email,
    password,
    error,
    loading
  }
}
export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser, loginUserFail })(LoginForm)

const styles = {
  containerStyle:{
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
