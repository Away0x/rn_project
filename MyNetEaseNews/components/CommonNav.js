import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
const {width, height, scale} = Dimensions.get("window");

export default class CommonNav extends Component {
  static propTypes = {
    title: PropTypes.string,
    leftTitle: PropTypes.string,
    func: PropTypes.func
  }

  static defaultProps = {
    title: '',
    leftImageName: null,
    rightImageName: null,
    leftTitle: '',
    func: null
  }

  render() {
    return (
      <View style={styles.container}>
        {/*左图*/}
        <View style={styles.leftStyle}>
          <TouchableOpacity onPress={this.props.func}>
            {
              this.props.leftImageName
              ?
                <Image source={this.props.leftImageName} style={styles.imageStyle} />
              :
                <Text style={{color: 'orange', fontSize: 16}}>{this.props.leftTitle}</Text>
            }
          </TouchableOpacity>
        </View>

        {/*标题*/}
        <View style={{width: 200, alignItems: 'center'}}>
          <Text style={styles.titleStyle} numberOfLines={1}>{this.props.title}</Text>
        </View>

        {/*右图*/}
        <View style={styles.rightStyle}>
          <TouchableOpacity onPress={()=>alert(this.props.title)}>
            {
              this.props.rightImageName ? <Image source={this.props.rightImageName} style={styles.imageStyle} /> : null
            }
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#e6e6e6',
    borderBottomWidth: 2,
    backgroundColor: '#f1f4ed'
  },
    leftStyle: {
      "position": "absolute",
      "left": 10,
      "bottom": 10
    },
    rightStyle: {
      "position": "absolute",
      "right": 10,
      "bottom": 10
    },
      imageStyle: {
        width: 25,
        height: 25,
      },
    titleStyle: {
      fontSize: 16,
      fontWeight: 'bold'
    }
});
