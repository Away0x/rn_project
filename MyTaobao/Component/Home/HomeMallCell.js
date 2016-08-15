/**
* 首页子项, 购物中心块
* index -- Launch -> Main(Home)
* Home(FamilyCell, OfferCell(CommonCell), ActivityCell(CommonCell), MallCell(CommonNav, _MallItem))
* MallCell(CommonNav, _MallItem)
*/
import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';

// 外部数据
import DATA from './data/Data_HomeMallData';

import CommonNav from './__HomeCommonNav';

export default class ActivityCell extends Component {
  static propTyoes = {
    popToHomeView: PropTypes.func // 用于传递url的回调
  }

  static defaultProps = {
    popToHomeView: null
  }

  render() {
    return (
      <View style={styles.container}>
        {/*导航*/}
        <CommonNav
          leftIcon={require('./img/gwzx.png')}
          leftTitle={'购物中心'}
          rightTitle={DATA.tips}
        />

        {/*内容*/}
        <ScrollView style={styles.scrollViewStyle}
          horizontal={true} // 横向
          showsHorizontalScrollIndicator={false} // 去水平滚动条
        >
          {this.renderScrollViewCell()}
        </ScrollView>
      </View>
    );
  }

  popToHome(url) {
    url && this.props.popToHomeView(url);
  }

  // 渲染每一个商场
  renderScrollViewCell() {
    let itemArr = [];

    let data = DATA.data;

    data.forEach((item, index) => {
      itemArr.push(
        <MallItem key={index}
          mallImage={item.img}
          mallSale={item.showtext.text}
          mallName={item.name}
          detailurl={item.detailurl}
          popToMall={(url) => this.popToHome(url)}
        />
      );
    });

    return itemArr;
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12
  },

    scrollViewStyle: {
      flexDirection: 'row',
      backgroundColor: 'white',
      padding: 10
    }
});


/* ------------------------------ 内部组件 MallItem ------------------------------ */
class MallItem extends Component {
  static propTyoes = {
    mallSale: PropTypes.string,
    mallName: PropTypes.string,
    detailurl: PropTypes.string,
    popToMall: PropTypes.func
  }

  static defaultProps = {
    mallImage: '',
    mallSale: '',
    mallName: '',
    detailurl: '',
    popToMall: null
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.clickItem(this.props.detailurl)}>
        <View style={_styles.itemViewStyle}>
          <Image source={this.props.mallImage} stlye={_styles.imageStyle} />

          <Text style={_styles.mallSaleStyle}>{this.props.mallSale}</Text>
          <Text style={_styles.mallNameStyle}>{this.props.mallName}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  clickItem(url) {
    url && this.props.popToMall(url);
  }
}

const _styles = StyleSheet.create({
  itemViewStyle: {
    margin: 8
  },
    imageStyle: {
      borderRadius: 15,
    },
    mallSaleStyle: {
      position: 'absolute',
      fontSize: 12,
      bottom: 40,
      backgroundColor: 'orange',
      padding: 1,
    },
    mallNameStyle: {
      textAlign: 'center',
      marginTop: 5,
      fontSize: 15
    }
});
