import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import CommonNav from '../CommonNav';

export default class Find extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/*导航*/}
        <CommonNav title={'发现'} />

        {/*内容*/}
        <Text>Find</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  constainer: {
    flex: 1
  }
});
