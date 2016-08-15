import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';


import Main from './components/Main/Main';

class MyNetEaseNews extends Component {
  render() {
    return (
      <Main />
    );
  }
}

AppRegistry.registerComponent('MyNetEaseNews', () => MyNetEaseNews);
