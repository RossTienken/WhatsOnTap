import React, { Component } from 'react'
import { View, Text, ListView, Image, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux';
import BeerListItem from './BeerListItem'

class ResultsBeer extends Component {

  componentWillMount(){
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.dataSource = ds.cloneWithRows(this.props.filteredBeers)
  }

  renderRow(beer){
    return (
      <BeerListItem beer = { beer }/>
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
  const { filteredBeers } = state.search
  return { filteredBeers }
}

export default connect(mapStateToProps)(ResultsBeer)
