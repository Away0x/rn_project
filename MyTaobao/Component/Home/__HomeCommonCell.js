/**
* 首页子项，公共的cell，OfferCell和ActivityCell都有用到
* index -- Launch -> Main(Home)
* Home(FamilyCell, OfferCell(CommonCell), ActivityCell(CommonCell), MallCell)
* CommonCell
*/
import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
const {width, height, scale} = Dimensions.get("window");

export default class CommonCell extends Component {
  static propTypes = {
    title: PropTypes.string,
    subTitle: PropTypes.string,
    // rightImage
    titleColor: PropTypes.string,
    callBackClickCell: PropTypes.func,
    tplurl: PropTypes.string
  }

  static defaultProps = {
    title: '',
    subTitle: '',
    rightImage: null,
    titleColor: '',
    callBackClickCell: null, //回调，传数据给父组件
    tplurl: '' // 跳转的url路径, 会通过callBackClickCell，层层传递，直至给顶层Home,home通过该路径做路由,跳转到webView
  }

  render() {
    return (
      <TouchableOpacity onPress={() => {this.props.tplurl ? this.clickCell(this.props.tplurl) : null}}>
        <View style={styles.container}>
          {/*左*/}
          <View>
            <Text style={[styles.titleStyle, {color: this.props.titleColor}]}>
              {this.props.title}
            </Text>
            <Text style={styles.subTitleStyle}>{this.props.subTitle}</Text>
          </View>

          {/*右*/}
          <Image source={this.props.rightImage} style={{width: 64, height: 43, resizeMode: 'contain'}} />
        </View>
      </TouchableOpacity>
    );
  }

  // 点击了cell
  clickCell(data){
      // 判断处理
     if (this.props.callBackClickCell == null) return;
     // 执行回调函数
     this.props.callBackClickCell(data);
  }
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.5 -1,
    height: 59,
    marginBottom: 1,
    marginRight: 1,

    backgroundColor: 'white',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  titleStyle: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  subTitleStyle: {
    color: 'grey'
  }
});
