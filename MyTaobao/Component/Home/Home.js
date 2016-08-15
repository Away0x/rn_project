/**
* 首页
* index -- Launch -> Main(Home)
* Home(FamilyCell, OfferCell(CommonCell), ActivityCell(CommonCell), MallCell(CommonNav, _MallItem))
*/
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import FamilyCell from './HomeFamilyCell';
import OfferCell from './HomeOfferCell';
import ActivityCell from './HomeActivityCell';
import MallCell from './HomeMallCell';
import GuessYouLike from './HomeGuessYouLike';

// 二级页面
import ActivityCellDetail from './Detail_HomeActivityCell';
import MallCellDetail from './Detail_HomeMallCell';

import styles from './styles/HomeStyles';

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/*首页的导航条*/}
        {this.renderNavBar()}


        {/*首页内容*/}
        <ScrollView>
          {/*分类模块*/}
          <FamilyCell />

          {/*抢购/特价模块*/}
          <OfferCell />

          {/*活动模块*/}
          <ActivityCell popTopHome={(url) => this.pushToActivityCellDetail(url)} />

          {/*购物中心模块*/}
          <MallCell popToHomeView={(url) => this.pushToMallCellDetail(url) } />

          {/*猜你喜欢*/}
          <GuessYouLike />
        </ScrollView>
      </View>
    );
  }

  /* ---------- 渲染 Home 页的导航 ---------- */
  renderNavBar() {
    return (
      <View style={styles.navStyle}>
        {/* --- 左边 --- */}
        <View style={styles.navLeftStyle}>
          <TouchableOpacity onPress={() => alert('点击了text')}>
            <Text style={styles.navLeftTextStyle}>上海</Text>
          </TouchableOpacity>
        </View>

        {/* --- 中间 --- */}
        <View style={styles.navMiddleStyle}>
          <TextInput
            placeholder="输入商家，品类，商圈"
          />
        </View>

        {/* --- 右边 --- */}
        <View style={styles.navRightStyle}>
          <TouchableOpacity onPress={() => alert('点击了img1')}>
            <Image source={require('./img/icon_home_message.png')} style={styles.navRightImageStyle} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert('点击了img2')}>
            <Image source={require('./img/icon_home_scan.png')} style={styles.navRightImageStyle} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  urlDealWith(url) {
    if (!url) return;
    return url.replace('imeituan://www.meituan.com/web/?url=', '');
  }

  // 跳转到ActivityCell二级界面
  pushToActivityCellDetail = (url) => {
    // alert(url);
    let _url = this.urlDealWith(url);

    this.props.navigator.push({
      component: ActivityCellDetail, // 要跳转的组件
      title: 'ActivityCellDetail'
    });
  }

  // 跳转到MallCell二级界面
  pushToMallCellDetail = (url) => {
    // alert(url);
    let _url = this.urlDealWith(url);

    this.props.navigator.push({
      component: MallCellDetail, // 要跳转的组件
      passProps: {url: _url}
    });
  }
}
