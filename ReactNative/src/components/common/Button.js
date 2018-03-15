import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles

  return (
    <TouchableOpacity style={ buttonStyle } onPress={ onPress }>
      <Text style={ textStyle }>
        {children}
      </Text>
    </TouchableOpacity>
  )
}

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#50505080',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'white',
    marginLeft: 75,
    marginRight: 75
  }
}

export { Button }
