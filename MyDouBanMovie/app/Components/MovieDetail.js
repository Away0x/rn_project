import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Navigator
} from 'react-native';

// 子组件
import CommonNav from './__CommonNav';

// https://api.douban.com/v2/movie/subject/1292063

export default class MovieDetail extends Component {
  static propTypes = {
    movie: PropTypes.object // 数据
  }

  static defaultProps = {}

  constructor(props) {
    super(props)

    this.state = {
      movieDetail: '',
      loaded: false,
    }

    const REQUEST_URL = `https://api.douban.com/v2/movie/subject/${this.props.movie.id}`
    this.fetchData(REQUEST_URL)
  }

  fetchData(REQUEST_URL) {
    fetch(REQUEST_URL)
      .then(res => res.json())
      .then(resJson => {
        this.setState({
          movieDetail: resJson,
          loaded: true
        })
      })
      .done()
  }

  render() {
    let movie = this.state.movieDetail;
    // 将请求到的文本根据'\n'分割成段落，添加段落样式后再渲染
    let summary; // 判断的原因是，请求是异步的，即一开始没有movie，其是undefined，无split会报错
    // 请求完成后,movie才有，因此当movie.summary为字符串时，说明请求完成，可split了
    if ((typeof movie.summary) === 'string') {
      summary = movie.summary.split(/\n/).map((p, i) => {
        return (
          <View key={i} style={{marginBottom: 15, paddingLeft: 6, paddingRight: 6}}>
            <Text style={styles.itemText}>{p}</Text>
          </View>
        );
      });
    }

    return (
      <View style={styles.container}>
        <CommonNav
          title={this.props.movie.title}
          doSomething={this.popToFeatured}
          canBack={true}
        />

      {
        !this.state.loaded
        ?
          <View style={styles.loading}>
            <ActivityIndicator size={'large'} color={'#6435c9'} />
          </View>
        :
          <View style={styles.item}>
            {summary}
          </View>
      }
      </View>
    );
  }

  // 出路由栈
  popToFeatured = () => {
    this.props.navigator.pop();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eae7ff'
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    borderBottomWidth: 1,
    borderColor: 'rgba(100, 53, 201, 0.1)',
    paddingBottom: 6,
    paddingTop: 6,
  },
    itemText: {
      fontSize: 14,
      fontFamily: 'Helvetica Neue',
      color: 'rgba(0, 0, 0, 0.8)',
      fontWeight: '300',
      lineHeight: 26
    }
});
