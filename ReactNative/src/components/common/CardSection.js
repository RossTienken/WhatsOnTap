import React from 'react'
import { View, StyleSheet } from 'react-native'

const CardSection = (props) => {
  return (
    <View style={styles.containerStyle}>
      { props.children }
    </View>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 2,
    marginBottom: 2,
    borderBottomWidth: 1,
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#50505080',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: 'transparent',
    position: 'relative'
  }
})

export { CardSection }
