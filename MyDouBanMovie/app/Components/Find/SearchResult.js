import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableHighlight
} from 'react-native';

// 子组件
import CommonNav from '../__CommonNav';

export default class SearchResult extends Component {
  static propTypes = {
    resulsts: PropTypes.array, // 查询结果
    pushToResultDetail: PropTypes.func, // 路由回调
    query: PropTypes.string // 查询词,
  }

  static defaultProps = {}

  constructor(props) {
    super(props)

    this.dataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})

    this.state = {
      movies: this.props.resulsts,
    }
  }

  render() {
    return (
        <View style={styles.container}>
          <CommonNav
            title={`搜索：${this.props.query}`}
            canBack={true}
            doSomething={this.popToFind}
          />

          {
            !this.props.resulsts.length > 0
            ?
              <View style={styles.empty}>
                <Text>搜索结果为空</Text>
              </View>
            :
              <ListView
                dataSource={this.dataSource.cloneWithRows(this.state.movies)}
                renderRow={this.renderMovieList}
              />
          }
        </View>
    );
  }

  // 出栈
  popToFind = () => {
    this.props.navigator.pop();
  }

  // push MovieDetail 入栈
  showMovieDetail(movie) {
    this.props.pushToResultDetail(movie)
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eae7ff'
  },
  empty: {
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
