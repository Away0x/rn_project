import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

// 子组件
import FindForm from './__FindForm';
import CommonNav from '../__CommonNav';

// 跳转页面
import SearchResult from './SearchResult';
  import MovieDetail from '../MovieDetail'; // 是在 SearchResult页跳转的，但是路由在当前页设置

export default class Find extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <CommonNav
          title={'搜索'}
        />

        <FindForm pushToFindResult={this.pushToFindResult} />
      </View>
    );
  }

  // push SearchResult 入路由栈
  pushToFindResult = (resJson, query) => {
    this.props.navigator.push({
      title: resJson.title,
      component: SearchResult,
      passProps: {
        resulsts: resJson.subjects,
        pushToResultDetail: this.pushToResultDetail,
        query: query
      }
    });
  }

  // push MovieDetail 入路由栈, 传递给 SearchResult，入栈事件在其身上
  pushToResultDetail = (movie) => {
    this.props.navigator.push({
      title: movie.title,
      component: MovieDetail,
      passProps: {
        movie: movie
      }
    });
  }
}
