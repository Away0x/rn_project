/**
* 启动页面
* index -> this
*/
import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text
} from 'react-native';

import Main from './Main';

export default class Launch extends Component {
  // constructor(props) {
  //     super(props);
  // }

  /* ---------- 初始化 BEGIN ---------- */
  // static defaultProps = {}

  // static propTypes = {}

  // state = {}
  /* ---------- 初始化 END ---------- */

  /* ---------- 生命周期 BEGIN ---------- */
  componentDidMount() {
      // 定时：进入app 2s后，切换到 Main里
      setTimeout(() => {
        // 页面切换,直接替换,用replace而不是push
        this.props.navigator.replace({
          component: Main
        });
      }, 1000);
  }
  /* ---------- 生命周期 END ---------- */

  /* ---------- 事件函数 BEGIN ---------- */
  // handle = (ev) => {} // 用这种方法在声明时就绑定this，因此组件中就不用.bind(this)了
  /* ---------- 事件函数 END ---------- */


  render() {
    return (
      // <View style={styles.LaunchStyle} > 不知道为什么图片只能显示一部分,resizeMode没用，网络获取的则可以设置
        <Image style={{flex: 1}} resizeMode="stretch"
          source={require('./img/launch.jpg')}
        />
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  LaunchStyle: {
    flex: 1
  }
});
