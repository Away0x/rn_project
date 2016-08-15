/**
* 更多页
* index -- Launch -> Main(More)
* More(CommonCell * n)
*/
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import CommonCell from './MoreCommonCell';

import styles from './styles/MoreStyles';

export default class More extends Component {
  // constructor(props) {
  //     super(props);
  // }

  /* ---------- 初始化 BEGIN ---------- */
  // static defaultProps = {}

  // static propTypes = {}

  // state = {}

  /* ---------- 初始化 END ---------- */

  /* ---------- 生命周期 BEGIN ---------- */
  /* ---------- 生命周期 END ---------- */

  /* ---------- 事件函数 BEGIN ---------- */
  // handle = (ev) => {} // 用这种方法在声明时就绑定this，因此组件中就不用.bind(this)了
  /* ---------- 事件函数 END ---------- */
  render() {
    return (
      <View style={styles.container}>
        {/*-------- 导航条 ----------*/}
        {this.reanderNavBar()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {/*第一组cell*/}
          <View style={{marginTop: 20}}>
            <CommonCell title={'扫一扫'} />
          </View>

          {/*第二组cell*/}
          <View style={{marginTop: 20}}>
            <CommonCell title={'省流量模式'} isSwitch={true} />
            <CommonCell title={'消息提醒'} isSwitch={true} switchValueIsOn={true} />
            <CommonCell title={'网络诊断'} />
            <CommonCell title={'邀请好友'} />
            <CommonCell title={'清空缓存'} rightTitle={'1.99M'} />
          </View>

          {/*第三组cell*/}
          <View style={{marginTop: 20}}>
            <CommonCell title={'意见反馈'} />
            <CommonCell title={'问卷调查'} />
            <CommonCell title={'支付帮助'} />
            <CommonCell title={'我要应聘'} />
          </View>

          {/*第四组cell*/}
          <View style={{marginTop: 20}}>
            <CommonCell title={'精品应用'} />
            <CommonCell title={'关于我们'} />
            <CommonCell title={'声明'} />
          </View>
        </ScrollView>
      </View>
    );
  }

  /* ---------- 渲染 More 页的导航 ---------- */
  reanderNavBar() {
    return (
      <View style={styles.navStyle}>
        {/* --- 中间 --- */}
        <View style={styles.navMiddleStyle}>
          <Text style={styles.navMiddleTextStyle}>更多</Text>
        </View>

        {/* --- 右边: 绝对定位 --- */}
        <View style={styles.navRightStyle}>
          <TouchableOpacity onPress={() => alert('点击了img')}>
            <Image source={require('./img/icon_more_setting.png')} style={styles.navRightImageStyle}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
