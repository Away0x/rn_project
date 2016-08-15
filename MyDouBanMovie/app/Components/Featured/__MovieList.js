import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native';

export default class MovieList extends Component {
  static propTypes = {
    pushToDetail: PropTypes.func // 路由回调
  }

  static defaultProps = {}

  constructor(props) {
    super(props)

    this.state = {
      movies: [],
      loaded: false,
      // 这三个值是用于豆瓣api的 https://api.douban.com/v2/movie/top250?count=20&start=0
      count: 20,
      start: 0,
      total: 0,
    }

    this.dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    }),

    this.REQUEST_URL = 'https://api.douban.com/v2/movie/top250'

    this.fetchData()
  }

  requestURL(
    url = this.REQUEST_URL,
    count = this.state.count,
    start = this.state.start,
  ) {
    return `${url}?count=${count}&start=${start}`
  }

  // 加载初始的数据
  fetchData() {
    fetch(this.requestURL())
      .then(res => res.json())
      .then(resJson => {
        let newStart = resJson.start + resJson.count
        this.setState({
          movies: resJson.subjects,
          loaded: true,
          total: resJson.total,
          start: newStart,
        })
      })
      .done()
  }

  // 加载更多数据
  loadMore = () => {
    fetch(this.requestURL())
      .then(res => res.json())
      .then(resJson => {
        let newStart = resJson.start + resJson.count
        this.setState({
          movies: [...this.state.movies, ...resJson.subjects],
          start: newStart,
        })
      })
      .done()
  }

  // 列表滚动到底时的事件
  onEndReached = () => {
    console.log(`到底了! 开始：${this.state.start}, 总共：${this.state.total}`);

    if (this.state.total > this.state.start) {
      this.loadMore()
    }
  }

  render() {
    return (
      !this.state.loaded // 加载状态
      ?
        <View style={styles.container}>
          <View style={styles.loading}>
            <ActivityIndicator size={'large'} color={'#6435c9'} />
          </View>
        </View>
      :
        <View style={styles.container}>
          <ListView
            pageSize={this.state.count} // 每一次载入的数量
            initialListSize={this.state.count}
            dataSource={this.dataSource.cloneWithRows(this.state.movies)}
            renderRow={this.renderMovieList}
            renderFooter={this.renderFooter}
            onEndReached={this.onEndReached}
          />
          <Text style={{fontSize: 8}}>已加载：{this.state.start}, 总共：{this.state.total}</Text>
        </View>
    );
  }

  // push MovieDetail 进路由栈
  showMovieDetail = (movie) => {
    this.props.pushToDetail(movie)
  }

  // 渲染列表行
  renderMovieList = (movie) => {
    return (
      <TouchableHighlight underlayColor='rgba(34, 26, 38, 0.1)'  onPress={() => {
          // console.log(`《${movie.title}》 被点击了`);
          this.showMovieDetail(movie)
        }}>
        <View style={styles.item}>
          <View style={styles.itemImage}>
            <Image source={{uri: movie.images.large}} style={styles.image} />
          </View>
          <View style={styles.itemContent}>
            <Text style={styles.itemHeader}>{movie.title}</Text>
            <Text style={styles.itemMeta}>
              {movie.original_title} ( {movie.year} )
            </Text>
            <Text style={styles.redText}>{movie.rating.average}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  // 渲染列表脚
  renderFooter = () => {
    if (this.state.total > this.state.start) {
      return (
        <View
          style={{marginVertical: 10, alignSelf: 'center'}}
        >
          <ActivityIndicator/>
        </View>
      )
    }
    else {
      return (
        <View
          style={{marginVertical: 10, alignSelf: 'center'}}
        >
          <Text style={{color: 'rgba(0,0,0,0.3)'}}>没有可显示的内容了 : ) </Text>
        </View>
      )
    }
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
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'rgba(100, 53, 201, 0.1)',
    paddingBottom: 6,
    paddingTop: 6,
    flex: 1,
  },
    itemImage: {},
      image: {
        width: 90,
        height: 130,
        padding: 6,
      },

    itemContent: {
      flex: 1,
      marginLeft: 13,
      marginTop: 6,
    },
      itemHeader: {
        fontSize: 18,
        fontFamily: 'Helvetica Neue',
        fontWeight: '300',
        color: '#6435c9',
        marginBottom: 6,
      },
      itemMeta: {
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.6)',
        marginBottom: 6,
      },
      redText: {
        color: '#db2828',
        fontSize: 15,
      },
});
