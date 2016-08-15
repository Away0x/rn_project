/**
* 我的页子项，单元行
* index -- Launch -> Main(Mine)
* Mine(CommonCell * n)
* CommonCell
*/
import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity,
  Switch
} from 'react-native';

export default class CommonCell extends Component {
  // constructor(props) {
  //     super(props);
  //     // alert(this.state.switchValueIsOn)
  // }

  /* ---------- 初始化 BEGIN ---------- */
  static propTypes = {
    title: PropTypes.string, // 标题
    rightTitle: PropTypes.string, // cell右侧显示文字
    leftIcon: PropTypes.number, // 小图标为require('静态字符串') // 很奇怪require不是func而是一个number
    rightIcon: PropTypes.number, // 小图标为require('静态字符串')
  }

  static defaultProps = {
    title: '',
    rightTitle: '',
    leftIcon: null,
    rightIcon: null,
  }

  // state = {}
  /* ---------- 初始化 END ---------- */

  /* ---------- 生命周期 BEGIN ---------- */
  /* ---------- 生命周期 END ---------- */

  /* ---------- 事件函数 BEGIN ---------- */
  // handle = (ev) => {} // 用这种方法在声明时就绑定this，因此组件中就不用.bind(this)了
  /* ---------- 事件函数 END ---------- */

  render() {
    return (
      <TouchableOpacity onPress={() => alert(this.props.title)}>
        <View style={styles.container}>
          {/*左边*/}
          <View style={styles.leftStyle}>
              <Image source={this.props.leftIcon} style={styles.leftImgStyle} />
            <Text style={{fontSize: 15, marginLeft: 8}}>{this.props.title}</Text>
          </View>

          {/*右边*/}
          <View style={styles.rightStyle}>
            {/*如右边有字，则显示字，否则显示图片*/}
            {
              this.props.rightTitle.length > 0
              ?
                <Text style={{fontSize: 12, color: 'grey', marginRight: 5}}>{this.props.rightTitle}</Text>
              :
                <Image source={this.props.rightIcon} style={{width: 20, height: 12, marginRight: 5}} />
            }
            <Image source={require('./img/icon_cell_rightarrow.png')} style={styles.rightImageStyle} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    height: Platform.OS === 'ios' ? 50 : 45,
    borderBottomColor: '#dddddd',
    borderBottomWidth: 0.5,
    backgroundColor: 'white'
  },

    leftStyle: {
      flexDirection: 'row',
      marginLeft: 8
    },
      leftImgStyle: {
        width: 24,
        height: 24,
        borderRadius: 12
      },


    rightStyle: {
      marginRight: 8,
      flexDirection: 'row',
      alignItems: 'center'
    },
      rightImageStyle: {
        width: 8,
        height: 13,
      },
});
