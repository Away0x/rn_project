/**
* 我的页
* index -- Launch -> Main(Mine)
* Mine(Header, OrderCell, CommonCell * n)
*/
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import Header from './MineHeader';
import OrderCell from './MineOrderCell';
import CommonCell from './MineCommonCell';


import styles from './styles/MineStyles';

export default class Mine extends Component {
  // constructor(props) {
  //     super(props);
  // }

  /* ---------- 初始化 BEGIN ---------- */
  // static propTypes = {}

  // static defaultProps = {} // 子组件一般是没有自己的props的，大都是父组件传的

  // state = {}
  /* ---------- 初始化 END ---------- */


  /* ---------- 生命周期 BEGIN ---------- */
  /* ---------- 生命周期 END ---------- */


  /* ---------- 事件函数 BEGIN ---------- */
  // handle = (ev) => {} // 用这种方法在声明时就绑定this，因此组件中就不用.bind(this)了
  /* ---------- 事件函数 END ---------- */


  /* ---------- 渲染主体 BEGIN ---------- */
  render() {
    return (
      <ScrollView style={styles.scrollViewStyle}>
        {/*头部*/}
        <Header />

        {/*订单列*/}
        <View>
          <CommonCell title={'我的订单'} rightTitle={'查看全部订单'} leftIcon={require('./img/collect.png')} />
          <OrderCell />
        </View>

        {/*第一组cell*/}
        <View style={{marginTop: 12}}>
          <CommonCell title={'我的钱包'} rightTitle={'账户余额:￥1000000000'} leftIcon={require('./img/draft.png')} />
          <CommonCell title={'抵用券'} rightTitle={'0'} leftIcon={require('./img/like.png')} />
        </View>

        {/*第二组cell*/}
        <View style={{marginTop: 12}}>
          <CommonCell title={'积分商城'} leftIcon={require('./img/card.png')} />
        </View>

        {/*第三组cell*/}
        <View style={{marginTop: 12}}>
          <CommonCell title={'今日推荐'} leftIcon={require('./img/new_friend.png')} rightIcon={require('./img/me_new.png')} />
        </View>

        {/*第四组cell*/}
        <View style={{marginTop: 12}}>
          <CommonCell title={'我要合作'} leftIcon={require('./img/pay.png')} rightTitle={'轻松开店，招财进宝'} />
        </View>
      </ScrollView>
    );
  }
  /* ---------- 渲染主体 END ---------- */


  /* ---------- 一些渲染方法 BEGIN ---------- */
  /* ---------- 一些渲染方法 END ---------- */
}
