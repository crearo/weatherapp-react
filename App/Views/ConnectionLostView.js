'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
} from 'react-native';

class ConnectionLostView extends React.Component{

  constructor(props){
    super(props);
  }

  onRetryPressed(){
    console.log("Clicked to retry connection");
    this.props.retry();
  }

  render() {
    return (
      <View>
        <Text>No Internet Connection.</Text>
        <TouchableHighlight onPress={() => {this.props.retry()}}>
          <Text>Retry</Text>
        </TouchableHighlight>
      </View>
    )
  }

};

module.exports = ConnectionLostView;
