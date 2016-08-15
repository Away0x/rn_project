/**
* 首页子项, 特价块
* index -- Launch -> Main(Home)
* Home(FamilyCell, OfferCell(CommonCell), ActivityCell(CommonCell), MallCell(CommonNav, _MallItem))
* OfferCell(CommonCell)
*/
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
const {width, height, scale} = Dimensions.get("window");

// 外部数据
import DATA from './data/Data_HomeOfferData';

import CommonCell from './__HomeCommonCell';

export default class OfferCell extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/*左边*/}
        {this.renderLeftView()}

        {/*右边*/}
        <View style={styles.rightStyle}>
          {this.renderRightView()}
        </View>
      </View>
    );
  }

  // 渲染左边的View
  renderLeftView() {
    let leftData = DATA.dataLeft[0];
    return (
      <TouchableOpacity onPress={()=>alert(leftData.title)}>
        <View style={styles.leftStyle}>
          <Image source={leftData.img1} style={styles.leftImage1} />
          <Image source={leftData.img2} style={styles.leftImage2}  />

          <Text>{leftData.title}</Text>

          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5}}>
            <Text style={{color: 'blue', marginRight: 5}}>{leftData.price}</Text>
            <Text style={{color: 'orange', backgroundColor: 'yellow'}}>{leftData.sale}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  // 渲染右边的View
  renderRightView() {
    let itemArr = [];

    let rightData = DATA.dataRight;

    rightData.forEach((item, index) => {
      itemArr.push(
        <CommonCell key={index}
          title={item.title}
          subTitle={item.subTitle}
          rightImage={item.rightImage}
          titleColor={item.titleColor}
        />
      );
    });

    return itemArr;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 12,
  },

    leftStyle: {
      backgroundColor: 'white',
      width: width * 0.5,
      height: 120,
      marginRight: 1, // 同margin来做分割线，显示出底色

      alignItems: 'center',
      justifyContent: 'center'
    },
      leftImage1: {
        width: 120,
        height: 25,
        // 图片的内容模式
        resizeMode: 'contain'
      },
      leftImage2: {
        width: 120,
        height: 40,
        // 图片的内容模式
        resizeMode: 'contain'
      },

    rightStyle: {
      alignItems: 'center'
    }
});
