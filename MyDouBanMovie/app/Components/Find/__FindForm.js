import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableHighlight,
  ActivityIndicator,
  TextInput,
  AsyncStorage
} from 'react-native';

import icons from '../../Images/icons';

export default class FindForm extends Component {
  static propTypes = {
    pushToFindResult: PropTypes.func // 路由回调
  }

  static defaultProps = {}

  constructor(props) {
    super(props);
    /* AsyncStorage的使用方法 */
    // AsyncStorage.setItem('name', 'movieTalk') // 存储单个
    //   .then(() => {
    //     AsyncStorage.geItem('name') // 获取单个
    //       .then((value) => console.log(value))
    //   })
    // AsyncStorage.getAllKeys() // 获取所有key`
    //   .then((keys) => console.log(keys))
    // AsyncStorage.multiGet(['name']) // 获取多个
    //   .then((value) => console.log(value))
    // AsyncStorage.multiSet([['last', '2016'], ['component', 'react']]) // 存储多个

    this.dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
    this.state = {
      query: '',
      loaded: true,
      findHistory: [],
    }

    AsyncStorage.getItem('findHistory')
      .then((findHistory) => {
        if (findHistory) {
          this.setState({
            findHistory: JSON.parse(findHistory)
          })
        }
      })
  }

  findHistory() {
    // es6的数据类型set ,其内容不重复
    let newFindHistory = [...new Set([this.state.query, ...this.state.findHistory])]

    this.setState({
      findHistory: newFindHistory
    })
    // AsyncStorage存储的数据的value必须是字符串
    AsyncStorage.setItem('findHistory', JSON.stringify(newFindHistory))
  }

  fetchData = () => {
    this.findHistory()
    this.setState({loaded: false}) // 加载中

    const REQUEST_URL = `https://api.douban.com/v2/movie/search?q=${this.state.query}`
    fetch(REQUEST_URL)
      .then(res => res.json())
      .then(resJson => {
        this.setState({loaded: true}) // 加载完成
        this.props.pushToFindResult(resJson, this.state.query) // 路由入栈
      })
      .done()
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputStyle}>
          <TextInput
            value={this.state.query}
            style={styles.textInputStyle}
            placeholder="搜索..."
            placeholderTextColor="#6435c9"
            autoFocus={true}
            underlineColorAndroid="transparent"
            //autoCorrect={false}
            //defaultValue="火星救援"
            //editable={false}
            //keyboardType ="email-address"
            //multiline={true}
            //secureTextEntry={true}
            //onFocus={() => console.log('onFocus')}
            //onBlur={() => console.log('onBlur')}
            //onChange={() => console.log('onChange')}
            //onEndEditing={() => console.log('onEndEditing')}
            onChangeText={(query) => {
              // console.log(text)
              this.setState({
                query: query,
              });
            }}
            onSubmitEditing={this.fetchData}
          />

          <ActivityIndicator
            size={'small'}
            color={'#6435c9'}
            animating={!this.state.loaded}
            style={{position: 'absolute', right: 10, top: 25}}
          />
        </View>

        <Text style={styles.findHeaderStyle}>搜索历史：</Text>
        <ListView
          dataSource={this.dataSource.cloneWithRows(this.state.findHistory)}
          renderRow={this.renderFindHistoryList}
          enableEmptySections={true} // 这个版本不加会有警告
        />
      </View>
    );
  }

  // 点击history的行，会根据该行的历史搜索词去搜索数据，并渲染详情页
  find = (item, cb) => {
    this.setState({
      query: item 
    })
    // this.fetchData()
    setTimeout(() => this.fetchData(), 100) // 得等setState完成后才可fetchData
  }

  // 删除当前行的搜索历史
  deleteFindHistoryItem = (item) => {
    let newFindHistory = new Set(this.state.findHistory)
    newFindHistory.delete(item)

    this.setState({
      findHistory: [...newFindHistory]
    })

    AsyncStorage.setItem('findHistory', JSON.stringify([...newFindHistory]))
  }

  // 渲染列表行
  renderFindHistoryList = (item) => {
    return (
      <TouchableHighlight underlayColor='rgba(34, 26, 38, 0.1)'  onPress={() => this.find(item)}>
        <View style={styles.item}>
          <TouchableHighlight underlayColor='rgba(34, 26, 38, 0.1)'  onPress={() => this.deleteFindHistoryItem(item)}>
            <Image source={{uri: icons.delete}} style={styles.deleteIcon} />
          </TouchableHighlight>

          <View style={styles.itemContent}>
            <Text style={styles.itemHeader}>{item}</Text>
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
  inputStyle: {
    paddingTop: 7,
    paddingLeft: 7,
    paddingRight: 7,
    borderColor: 'rgba(100, 53, 201, 0.1)',
    borderBottomWidth: 1,
  },
    textInputStyle: {
      height: 50
    },

  findHeaderStyle: {
    color: 'rgba(0, 0, 0, 0.8)',
    fontSize: 16,
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 10,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(100, 53, 201, 0.1)',
    paddingBottom: 3,
    paddingTop: 3,
    flex: 1,
  },

    deleteIcon: {
      width: 20,
      height: 20,
      margin: 10,
      opacity: 0.6
    },

    itemContent: {
      flex: 1,
      marginLeft: 13,
      marginTop: 3,
    },
      itemHeader: {
        fontSize: 14,
        fontFamily: 'Helvetica Neue',
        fontWeight: '300',
        color: '#6435c9',
        marginBottom: 5,
      },
});
