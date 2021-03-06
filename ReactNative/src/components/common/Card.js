import React from 'react'
import { View, StyleSheet } from 'react-native'

const Card = (props) => {
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
    backgroundColor: '#5d5d5d',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#5d5d5d',
    position: 'relative'
  }
})

export { Card }
