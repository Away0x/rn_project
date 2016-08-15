import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';
const { height, width } = Dimensions.get('window');

export default class CommonNav extends Component {
  static propTypes = {
    title: PropTypes.string,
    doSomething: PropTypes.func,
    canBack: PropTypes.bool
  }

  static defaultProps = {
    title: '',
    doSomething: null,
    canBack: false
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.props.canBack
          ?
            <View style={styles.backStyle}>
              <TouchableOpacity activeOpacity={0.5} onPress={this.props.doSomething}>
                <Text style={styles.backTitleStyle}>返回</Text>
              </TouchableOpacity>
            </View>
          :
            null
        }

        <Text style={styles.titleStyle}>{this.props.title}</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: 45,
    backgroundColor: 'darkslateblue',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
    titleStyle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'rgba(255, 255, 255, 0.8)'
    },

    backStyle: {
      position: 'absolute',
      bottom: 14,
      left: 14
    },
      backTitleStyle: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)'
      }
});
