import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ListView,
  Dimensions,
  TouchableOpacity
} from 'react-native';
const {width, height, scale} = Dimensions.get("window");


// 外部数据，当网络请求数据失败时用
import DATA from './data/data.js';

import CommonNav from '../CommonNav';
import Swiper from './Swiper';
import NewsDetail from './NewsDetail';

const API_URL = 'http://c.m.163.com/nc/article/headline/T1348647853363/0-20.html?from=toutiao&fn=2&passport=&devId=nTM86EPlcxZu09VdpTEh6aR3%2B%2FQX6x8vHBD3ne3k5bbgOrg%2FIP5DcguSDmtYyWbs&size=20&version=8.1&spever=false&net=wifi&lat=5OtqEKiivwW4K%2BGMt6DBdA%3D%3D&lon=jKlRVyYkSNti2wwsjGQHrw%3D%3D&ts=1463384311&sign=TtD7IZllDljVzBs2E4sa9fQyKTKF021w2EUC6qx1gEN48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore';

const KEY_WORD = 'T1348647853363';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // 轮播图数据源
      swiperDataArr: [],
      // ListView数据源
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
  }

  componentDidMount() {
    this.loadDataFromNet();
  }

  // 处理网络数据
  dealWithData(jsonData) {
    let swiperArr = [], listDataArr = [];
    // 遍历拿到的json数据
    jsonData.forEach((item, index) => {
      if (item.hasAD === 1) {
        // 取出广告数据
        swiperArr.push(item.ads);
      }
      else { // 剩余的行数据
        listDataArr.push(item);
      }
    });
    // console.log(headerArr, listDataArr);
    this.setState({  // 更新状态机
      swiperDataArr: swiperArr[0],
      dataSource: this.state.dataSource.cloneWithRows(listDataArr)
    });
  }

  // fetch网络数据
  loadDataFromNet() {
    fetch(API_URL)
      .then((res) => res.json())
      .then((resJson) => {
        // debugger
        let jsonData = resJson[KEY_WORD];
        this.dealWithData(jsonData)
      })
      .catch((err) => { // 网络出错了，取本地数据
        // debugger
        // alert(err);
        let data = DATA[KEY_WORD]
        this.dealWithData(data)
      })
  }

  render() {
    return (
      <View style={styles.container}>
        {/*导航*/}
        <CommonNav title={'网易'}
          leftImageName={require('./img/friend.png')}
          rightImageName={require('./img/pop.png')}
        />

        {/*内容主体*/}
        <ScrollView>
          {/*轮播图*/}
          <Swiper imageDataArr={this.state.swiperDataArr} />

          {/*列表*/}
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
          />
        </ScrollView>
      </View>
    );
  }

  // 渲染listView具体的每一行
  renderRow(rowData) {
    // console.log(rowData);
    // alert(this)
    return (
      <TouchableOpacity activeOpacity={0.5} onPress={() => this.pushToNewsDetail(rowData)}>
        <View style={styles.cellStyle}>
          {/*左*/}
          <View style={styles.cellLeftStyle}>
            <Image style={styles.cellImageStyle} source={{uri: rowData.img}} />
          </View>

          {/*右*/}
          <View style={styles.cellRightStyle}>
            <Text style={styles.cellTitleStyle} numberOfLines={2}>{rowData.title}</Text>
            <Text style={styles.cellSubTitleStyle} numberOfLines={2}>{rowData.digest}</Text>

            <View style={styles.cellFollowTitleStyle}>
              <Text style={styles.cellFollowTitleTextStyle}>{rowData.replyCount}评论</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  // 跳转到新闻详情页
  pushToNewsDetail (data) {
    // alert(data.title)
    this.props.navigator.push({
      component: NewsDetail,
      title: data.title,
      passProps: {
        title: data.title,
        api_url_id: data.docid
      }
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
/* ListView Cell Style */
    cellStyle: {
      flexDirection: 'row',
      padding: 10,
      borderBottomColor: '#e8e8e8',
      borderBottomWidth: 0.8
    },

      // cell left
      cellLeftStyle: {},
        cellImageStyle: {
          width: 90,
          height: 90
        },

      // cell right
      cellRightStyle: {
        width: 270,
        marginLeft: 8
      },
        cellTitleStyle: {
          fontSize: 14,
          marginBottom: 5,
          fontWeight: 'bold'
        },
        cellSubTitleStyle: {
          color: 'grey',
          fontSize: 12
        },
        cellFollowTitleStyle: {
          position: 'absolute',
          bottom: 0,
          right: 0,
          borderWidth: 0.5,
          borderColor: 'grey',
          borderRadius: 5,
          padding: 2
        },
          cellFollowTitleTextStyle: {
            color: 'grey',
            fontSize: 11
          }
/* ListView Cell Style */
});
