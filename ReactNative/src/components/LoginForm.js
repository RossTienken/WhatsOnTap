import React, { Component } from 'react'
import {  View, KeyboardAvoidingView, ScrollView, Text, Image} from 'react-native'
import { connect } from 'react-redux'
import actions from 'react-native-router-flux'
import { Card, CardSection, Input, Button, Spinner } from './common'
import { emailChanged, passwordChanged, loginUser, loginUserFail, zipChanged, getZipCodes } from '../actions'

class LoginForm extends Component {

  onEmailChange(text){
    this.props.emailChanged(text)
  }

  onPasswordChange(text){
    this.props.passwordChanged(text)
  }

  onZipChange = (text) => {
    this.props.zipChanged(text)
  }

  onButtonPress(){
    const { email, password, zipCode } = this.props
    this.props.loginUser({ email, password, zipCode })
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
      <ScrollView>
      <Text style={{alignSelf:'center', fontSize:50, marginTop:85, fontWeight:'bold', color:'#e6e6e6'}}>{"What's On Tap?"}</Text>
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
        <CardSection style={{marginTop:15}}>
          <Input
            label='ZIP'
            placeholder='ZIP'
            onChangeText ={ this.onZipChange }
            value ={ this.props.zipCode }
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
    loading,
    zipCode,
    zipCodes
  }
}
export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser, loginUserFail, zipChanged, getZipCodes })(LoginForm)

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