import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import CommonNav from '../CommonNav';

export default class Mine extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/*导航*/}
        <CommonNav title={'我的'} />

        {/*内容*/}
        <Text>Mine</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  constainer: {
    flex: 1
  },
});
