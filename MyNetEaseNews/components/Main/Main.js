import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  Image,
  Dimensions
} from 'react-native';
const {width, height, scale} = Dimensions.get("window");

import TabNavigator from 'react-native-tab-navigator';

import Home from '../Home/Home';
import Find from '../Find/Find';
import Message from '../Message/Message';
import Mine from '../Mine/Mine';

export default class Main extends Component {
  state = {
    // 选中的是哪一个tab，默认为Home
    selectedTab: 'home'
  }

  render() {
    return (
      <TabNavigator>
        {/* --------------- 首页 --------------- */}
        <TabNavigator.Item
          title={'首页'}
          renderIcon={() => <Image source={require('./img/tabbar_home.png')} style={styles.iconStyle} />}
          renderSelectedIcon={() => <Image source={require('./img/tabbar_home_selected.png')} style={styles.iconStyle} />}
          onPress={() => {this.setState({selectedTab: 'home'})}}
          selected={this.state.selectedTab === 'home'}
          selectedTitleStyle={styles.selectedTitleStyle}
        >
          <Navigator
            initialRoute={{name: '首页', component: Home}}
            configureScene={() => {
              return Navigator.SceneConfigs.PushFromRight;
            }}
            renderScene={(route, navigator) => {
              let Component = route.component;
              return <Component {...route.passProps} navigator={navigator} />
            }}
          />
        </TabNavigator.Item>


        {/* --------------- 消息 --------------- */}
        <TabNavigator.Item
          title={'消息'}
          renderIcon={() => <Image source={require('./img/tabbar_message.png')} style={styles.iconStyle} />}
          renderSelectedIcon={() => <Image source={require('./img/tabbar_message_selected.png')} style={styles.iconStyle} />}
          onPress={() => {this.setState({selectedTab: 'message'})}}
          selected={this.state.selectedTab === 'message'}
          selectedTitleStyle={styles.selectedTitleStyle}
        >
          <Navigator
            initialRoute={{name: '消息', component: Message}}
            configureScene={() => {
              return Navigator.SceneConfigs.PushFromRight;
            }}
            renderScene={(route, navigator) => {
              let Component = route.component;
              return <Component {...route.passProps} navigator={navigator} />
            }}
          />
        </TabNavigator.Item>


        {/* --------------- 发现 --------------- */}
        <TabNavigator.Item
          title={'发现'}
          renderIcon={() => <Image source={require('./img/tabbar_find.png')} style={styles.iconStyle} />}
          renderSelectedIcon={() => <Image source={require('./img/tabbar_find_selected.png')} style={styles.iconStyle} />}
          onPress={() => {this.setState({selectedTab: 'find'})}}
          selected={this.state.selectedTab === 'find'}
          selectedTitleStyle={styles.selectedTitleStyle}
        >
          <Navigator
            initialRoute={{name: '发现', component: Find}}
            configureScene={() => {
              return Navigator.SceneConfigs.PushFromRight;
            }}
            renderScene={(route, navigator) => {
              let Component = route.component;
              return <Component {...route.passProps} navigator={navigator} />
            }}
          />
        </TabNavigator.Item>


        {/* --------------- 我的 --------------- */}
        <TabNavigator.Item
          title={'我的'}
          renderIcon={() => <Image source={require('./img/tabbar_mine.png')} style={styles.iconStyle} />}
          renderSelectedIcon={() => <Image source={require('./img/tabbar_mine_selected.png')} style={styles.iconStyle} />}
          onPress={() => {this.setState({selectedTab: 'mine'})}}
          selected={this.state.selectedTab === 'mine'}
          selectedTitleStyle={styles.selectedTitleStyle}
        >
          <Navigator
            initialRoute={{name: '我的', component: Mine}}
            configureScene={() => {
              return Navigator.SceneConfigs.PushFromRight;
            }}
            renderScene={(route, navigator) => {
              let Component = route.component;
              return <Component {...route.passProps} navigator={navigator} />
            }}
          />
        </TabNavigator.Item>
      </TabNavigator>
    );
  }
}

const styles = StyleSheet.create({
  "iconStyle": {
      "width": scale === 2 ? 25 : 20,
      "height": scale === 2 ? 25 : 20
  },
  "selectedTitleStyle": {
      "color": "orange"
  }
});
