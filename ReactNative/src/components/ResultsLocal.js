import React, { Component } from 'react'
import { View, Text, ListView, Image, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import LocalListItem from './LocalListItem'

class ResultsLocal extends Component {

  componentWillMount(){
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.dataSource = ds.cloneWithRows(this.props.filteredLocal)
  }

  renderRow(localBrew){
    return (
      <LocalListItem localBrew = { localBrew }/>
    )
  }

  render() {
    return (
      <KeyboardAvoidingView behavior={"padding"} style={{ flex:1,
      backgroundColor:'black' }}>
        <ScrollView>
          <ListView
            style={{ marginTop: 0 }}
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
  const { filteredLocal } = state.search
  return { filteredLocal }
}

export default connect(mapStateToProps)(ResultsLocal)
