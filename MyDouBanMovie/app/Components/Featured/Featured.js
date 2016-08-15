import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

// 子组件
import MovieList from './__MovieList';
import CommonNav from '../__CommonNav';

// 跳转页面
import MovieDetail from '../MovieDetail';

export default class Featured extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <CommonNav
          title={'推荐电影'}
        />

        <MovieList pushToDetail={this.pushToDetail} />
      </View>
    );
  }

  // MovieDetail进路由栈
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
