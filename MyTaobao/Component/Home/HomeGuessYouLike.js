import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableOpacity
} from 'react-native';

import CommonNav from './__HomeCommonNav';

// 外部数据
import DATA from './data/Data_HomeGuessYouLikeData';

const API_URL = 'http://api.meituan.com/group/v2/recommend/homepage/city/20?userId=160495643&userid=160495643&__vhost=api.mobile.meituan.com&position=23.134643%2C113.373951&movieBundleVersion=100&utm_term=6.6&limit=40&wifi-mac=64%3A09%3A80%3A10%3A15%3A27&ci=20&__skcy=X6Jxu5SCaijU80yX5ioQuvCDKj4%3D&__skua=5657981d60b5e2d83e9c64b453063ada&__skts=1459731016.350255&wifi-name=Xiaomi_1526&client=iphone&uuid=5C7B6342814C7B496D836A69C872202B5DE8DB689A2D777DFC717E10FC0B4271&__skno=FEB757F5-6120-49EC-85B0-D1444A2C2E7B&utm_content=5C7B6342814C7B496D836A69C872202B5DE8DB689A2D777DFC717E10FC0B4271&utm_source=AppStore&utm_medium=iphone&version_name=6.6&wifi-cur=0&wifi-strength=&offset=0&utm_campaign=AgroupBgroupD100H0&__skck=3c0cf64e4b039997339ed8fec4cddf05&msid=0FA91DDF-BF5B-4DA2-B05D-FA2032F30C6C2016-04-04-08-38594'


export default class GuessYouLike extends Component {
  constructor(props) {
    super(props);
    // 初始化数据源
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
  }

  componentDidMount() {
    // 从网络上请求数据
    this.loadDataFromNet();
  }

  render() {
    return (
      <View style={styles.container}>
        {/*头部导航*/}
        <CommonNav
          leftIcon={require('./img/cnxh.png')}
          leftTitle={'猜你喜欢'}
        />

        {/*内容列表*/}
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
  }

  // 渲染ListView每行的view
  renderRow(rowData) {
    // 处理图像的尺寸
    function dealWithImageUrl(url) {
      if (!url || url.search('w.h') == -1) { // 没找到w.h, 正常返回
        return url;
      } else {
        return url.replace('w.h', '120.90');
      }
    }

    return (
      <TouchableOpacity onPress={() => alert('测试中...')}>
        <View style={styles.listViewStyle}>
          {/*左*/}
          <Image source={{uri: dealWithImageUrl(rowData.imageUrl)}}
            style={styles.imageStyle}
          />

          {/*右*/}
          <View style={styles.rightStyle}>
            <View style={styles.rightTopStyle}>
              <Text style={{fontWeight: 'bold'}}>{rowData.title}</Text>
              <Text style={{color: 'grey', fontSize: 12}}>{rowData.topRightInfo}</Text>
            </View>

            <Text style={{color: 'grey', fontSize: 12}}>{rowData.subTitle}</Text>

              <View style={styles.rightBottomStyle}>
                <Text style={{color: 'red'}}>{rowData.subMessage}</Text>
                <Text style={{fontSize: 12}}>{rowData.bottomRightInfo}</Text>
              </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  // 去网络上拿数据
  loadDataFromNet() {
    fetch(API_URL)
      .then((res) => res.json())
      .then((resJson) => {
        // console.log(resJson);
        // 更新数据源
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(resJson.data)
        })
      })
      .catch((error) => { // 如果网上的数据获取失败，则用本地的数据
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(DATA.data)
        })
      })
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12
  },

  listViewStyle: {
    backgroundColor: 'white',
    padding: 10,
    borderBottomColor: '#e8e8e8',
    borderBottomWidth: 0.8,

    flexDirection: 'row',
    alignItems: 'center'
  },

    imageStyle: {
      width: 120,
      height: 90
    },

    rightStyle: {
      marginLeft: 8,
      width: 220,
      justifyContent: 'center'
    },
      rightTopStyle: {
        flexDirection: 'row',
        marginBottom: 7,
        justifyContent: 'space-between'
      },
      rightBottomStyle: {
        flexDirection: 'row',
        marginTop: 7,
        justifyContent: 'space-between'
      }

});
