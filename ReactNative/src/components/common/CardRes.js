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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  }
})

export { CardRes }
