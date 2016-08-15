/**
* 项目入口，navigator及渲染TabNavigator
* index -- Launch -> this(Home, Shop, Mine, More)
*/
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';

import Home from '../Home/Home';
import Shop from '../Shop/Shop';
import Mine from '../Mine/Mine';
import More from '../More/More';

import styles from './styles/MainStyles';

export default class Main extends Component {
  // constructor(props) {
  //     super(props);
  // }

  /* ---------- 初始化 BEGIN ---------- */
  state = {
    // 选中的是哪一个tab，默认为Home
    selectedTab: 'home'
  }

  // static defaultProps = {}

  // static propTypes = {}
  /* ---------- 初始化 END ---------- */

  /* ---------- 生命周期 BEGIN ---------- */
  /* ---------- 生命周期 END ---------- */

  /* ---------- 事件函数 BEGIN ---------- */
  // handle = (ev) => {} // 用这种方法在声明时就绑定this，因此组件中就不用.bind(this)了
  /* ---------- 事件函数 END ---------- */

  render() {
    return (
      <TabNavigator>
        {/* --- 首页 --- */}
        {this.renderTabBarItem({
          title: '首页',
          iconName: require('./img/icon_tabbar_home.png'),
          selectedIconName: require('./img/icon_tabbar_home_selected.png'),
          selectedTab: 'home',
          componentName: '首页',
          component: Home
        })}

        {/* --- 商家 --- */}
        {this.renderTabBarItem({
          title: '商家',
          iconName: require('./img/icon_tabbar_shop.png'),
          selectedIconName: require('./img/icon_tabbar_shop_selected.png'),
          selectedTab: 'shop',
          componentName: '商家',
          component: Shop
        })}

        {/* --- 我的 --- */}
        {this.renderTabBarItem({
          title: '我的',
          iconName: require('./img/icon_tabbar_mine.png'),
          selectedIconName: require('./img/icon_tabbar_mine_selected.png'),
          selectedTab: 'mine',
          componentName: '我的',
          component: Mine
        })}

        {/* --- 更多 --- */}
        {this.renderTabBarItem({
          title: '更多',
          iconName: require('./img/icon_tabbar_more.png'),
          selectedIconName: require('./img/icon_tabbar_more_selected.png'),
          selectedTab: 'more',
          componentName: '更多',
          component: More
        })}
      </TabNavigator>
    );
  }

  /* ---------- 渲染TabNavigator的子项 ---------- */
  // 不行封装，因为本地图片require必须是静态字符串，参数不行 // 笨死了，直接把require()抽成参数不就可以了！！！！
  // 这里的参数用到了es6的解构赋值特性
  renderTabBarItem({title, iconName, selectedIconName, selectedTab, componentName, component}) {
    return (
      <TabNavigator.Item
        title={title}
        //badgeText='10' ios是圆形，android是方块，不过可用renderBadge来自定义
        renderIcon={() => <Image source={iconName} style={styles.iconStyle} />}
        renderSelectedIcon={() => <Image source={selectedIconName} style={styles.iconStyle} />}
        onPress={() => {this.setState({selectedTab: selectedTab})}}
        selected={this.state.selectedTab === selectedTab}
        selectedTitleStyle={styles.selectedTitleStyle}
      >
        <Navigator
          initialRoute={{name: componentName, component: component}}
          configureScene={() => {
            return Navigator.SceneConfigs.PushFromRight;
          }}
          renderScene={(route, navigator) => {
            let Component = route.component;
            return <Component {...route.passProps} navigator={navigator} />
          }}
        />
      </TabNavigator.Item>
    );
  }
  /* ---------- render个体函数 END ---------- */
}
