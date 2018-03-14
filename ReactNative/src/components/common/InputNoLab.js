import React from 'react'
import { TextInput, View, Text } from 'react-native'

const InputNoLab = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry
}) => {
  const { inputStyle, labelStyle, containerStyle } = styles
  return (
    <View style={ containerStyle }>
      <TextInput
        secureTextEntry={ secureTextEntry }
        placeholder={ placeholder }
        placeholderTextColor='#ffffffb3'
        autoCorrect={ false }
        autoCapitalize="none"
        style={ inputStyle }
        value={ value }
        onChangeText={ onChangeText }
        underlineColorAndroid="transparent"
      />
    </View>
  )
}

const styles = {
  inputStyle: {
    color: 'white',
    backgroundColor: 'transparent',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 20,
    lineHeight: 23,
    flex: 2
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent'
  }
}

export { InputNoLab }
