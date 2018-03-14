import React from 'react'
import { View, StyleSheet } from 'react-native'

const CardRes = (props) => {
  return (
    <View style={styles.containerStyle}>
      { props.children }
    </View>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    borderColor: '#505050',
    borderBottomWidth: 1,
    backgroundColor: 'transparent',
    elevation: 1,
  }
})

export { CardRes }
