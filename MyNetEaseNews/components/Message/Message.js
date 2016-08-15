import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import CommonNav from '../CommonNav';

export default class Message extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/*导航*/}
        <CommonNav title={'消息'} />

        {/*内容*/}
        <Text>Message</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  constainer: {
    flex: 1
  }
});
