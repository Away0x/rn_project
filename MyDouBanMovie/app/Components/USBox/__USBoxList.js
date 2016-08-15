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

const REQUEST_URL = 'https://api.douban.com/v2/movie/us_box'

export default class USBoxList extends Component {
  static propTypes = {
    pushToDetail: PropTypes.func // 路由回调
  }

  static defaultProps = {}

  constructor(props) {
    super(props)

    this.state = {
      movies: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      loaded: false
    }

    this.fetchData()
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then(res => res.json())
      .then(resJson => {
        this.setState({
          movies: this.state.movies.cloneWithRows(resJson.subjects),
          loaded: true
        })
      })
      .done()
  }
  render() {
    return (
      !this.state.loaded
      ?
        <View style={styles.container}>
          <View style={styles.loading}>
            <ActivityIndicator size={'large'} color={'#6435c9'} />
          </View>
        </View>
      :
        <View style={styles.container}>
          <ListView
            dataSource={this.state.movies}
            renderRow={this.renderMovieList.bind(this)}
          />
        </View>
    );
  }

  showMovieDetail(movie) {
    this.props.pushToDetail(movie)
  }

  renderMovieList(movie) {
    return (
      <TouchableHighlight underlayColor='rgba(34, 26, 38, 0.1)' onPress={() => {
          // console.log(`《${movie.subject.title}》 被点击了`);
          this.showMovieDetail(movie.subject)
        }}>
        <View style={styles.item}>
          <View style={styles.itemImage}>
            <Image source={{uri: movie.subject.images.large}} style={styles.image} />
          </View>
          <View style={styles.itemContent}>
            <Text style={styles.itemHeader}>{movie.subject.title}</Text>
            <Text style={styles.itemMeta}>
              {movie.subject.original_title} ( {movie.subject.year} )
            </Text>
            <Text style={styles.redText}>{movie.subject.rating.average}</Text>
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
