import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Navigator
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';

import Featured from './app/Components/Featured/Featured';
import USBox from './app/Components/USBox/USBox';
import Find from './app/Components/Find/Find';

import icons from './app/Images/icons';

class MyDouBanMovie extends Component {
  state = {
    // 选中的是哪一个tab，默认为featured
    selectedTab: 'featured'
  }

  render() {
    return (
      <TabNavigator tabBarStyle={{backgroundColor: 'darkslateblue'}}>
        <TabNavigator.Item
          title={'推荐电影'}
          renderIcon={() => <Image source={{uri: icons.star}} style={styles.iconStyle} />}
          renderSelectedIcon={() => <Image source={{uri: icons.star_selected}} style={styles.iconStyle} />}
          onPress={() => {this.setState({selectedTab: 'featured'})}}
          selected={this.state.selectedTab === 'featured'}
          selectedTitleStyle={styles.selectedTitleStyle}
        >
          <Navigator
            initialRoute={{name: '推荐电影', component: Featured}}
            configureScene={() => {
              return Navigator.SceneConfigs.PushFromRight;
            }}
            renderScene={(route, navigator) => {
              let Component = route.component;
              return <Component {...route.passProps} navigator={navigator} />
            }}
          />
        </TabNavigator.Item>

        <TabNavigator.Item
          title={'北美票房'}
          renderIcon={() => <Image source={{uri: icons.box}} style={styles.iconStyle} />}
          renderSelectedIcon={() => <Image source={{uri: icons.box_selected}} style={styles.iconStyle} />}
          onPress={() => {this.setState({selectedTab: 'usbox'})}}
          selected={this.state.selectedTab === 'usbox'}
          selectedTitleStyle={styles.selectedTitleStyle}
        >
          <Navigator
            initialRoute={{name: '北美票房', component: USBox}}
            configureScene={() => {
              return Navigator.SceneConfigs.PushFromRight;
            }}
            renderScene={(route, navigator) => {
              let Component = route.component;
              return <Component {...route.passProps} navigator={navigator} />
            }}
          />
        </TabNavigator.Item>

        <TabNavigator.Item
          title={'搜索'}
          renderIcon={() => <Image source={{uri: icons.find}} style={styles.iconStyle} />}
          renderSelectedIcon={() => <Image source={{uri: icons.find_selected}} style={styles.iconStyle} />}
          onPress={() => {this.setState({selectedTab: 'find'})}}
          selected={this.state.selectedTab === 'find'}
          selectedTitleStyle={styles.selectedTitleStyle}
        >
          <Navigator
            initialRoute={{name: '搜索', component: Find}}
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
      "width": 25,
      "height": 25,
  },
  "selectedTitleStyle": {
      "color": "white",
  }
});

AppRegistry.registerComponent('MyDouBanMovie', () => MyDouBanMovie);
