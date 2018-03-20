import React, { Component } from 'react'
import { View, Text, ListView, Image, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import BrewListItem from './BrewListItem'

class ResultsBrew extends Component {

  componentWillMount(){
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.dataSource = ds.cloneWithRows(this.props.filteredBreweries)
  }

  renderRow(brewery){
    return (
      <BrewListItem brewery = { brewery }/>
    )
  }

  render() {
    return (
      <KeyboardAvoidingView behavior={"padding"} style={{ flex:1,
      backgroundColor:'black' }}>
        <ScrollView>
          <ListView
            style={{ marginTop: 25 }}
            dataSource={this.dataSource}
            renderRow={ this.renderRow }
            enableEmptySections={true}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = state => {
  const { filteredBreweries } = state.search
  return { filteredBreweries }
}

export default connect(mapStateToProps)(ResultsBrew)
