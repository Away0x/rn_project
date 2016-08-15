import React, { Component } from 'react';
import {
  Text,
  View,

} from 'react-native';

// 子组件
import USBoxList from './__USBoxList';
import CommonNav from '../__CommonNav';

// 跳转页面
import MovieDetail from '../MovieDetail';

export default class USBox extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <CommonNav
          title={'北美票房'}
        />

        <USBoxList pushToDetail={this.pushToDetail} />
      </View>
    );
  }

  // push MovieDetail 入栈
  pushToDetail = (movie) => {
    this.props.navigator.push({
      title: movie.title,
      component: MovieDetail,
      passProps: {
        movie: movie
      }
    });
  }
}
