import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator
} from 'react-native';

import Main from './Component/Main/Main';
import Launch from './Component/Main/Launch';

class MyTaobao extends Component {
  render() {
    return (
      // 这里有一个导航，Main里也有一个，会有冲突吗？
      // 不会，写再多个，也还是只会有一个导航，因为RN在路由里会有个diff算法来排除
      <Navigator
        initialRoute={{name: '启动页', component: Launch}}
        configureScene={() => {
          return Navigator.SceneConfigs.PushFromRight;
        }}
        renderScene={(route, navigator) => {
          let Component = route.component;
          return <Component {...route.passProps} navigator={navigator} />
        }}
      />
    );
  }
}

AppRegistry.registerComponent('MyTaobao', () => MyTaobao);
