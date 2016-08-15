/**
* 我的页子项，订单列
* index -- Launch -> Main(Mine)
* Mine(Header, OrderCell(_InnerView), CommonCell * n)
* OrderCell(_InnerView)
*/
import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

export default class OrderCell extends Component {
  // constructor(props) {
  //     super(props);
  // }

  /* ---------- 初始化 BEGIN ---------- */
  // static propTypes = {}

  // static defaultProps = {}

  // state = {}
  /* ---------- 初始化 END ---------- */


  /* ---------- 生命周期 BEGIN ---------- */
  /* ---------- 生命周期 END ---------- */


  /* ---------- 事件函数 BEGIN ---------- */
  // handle = (ev) => {} // 用这种方法在声明时就绑定this，因此组件中就不用.bind(this)了
  /* ---------- 事件函数 END ---------- */

  render() {
    return (
      <View style={styles.container}>
        <InnerView title={"待付款"} iconName={require('./img/order1.png')}/>
        <InnerView title={"待使用"} iconName={require('./img/order2.png')}/>
        <InnerView title={"待评价"} iconName={require('./img/order3.png')}/>
        <InnerView title={"退款/售后"} iconName={require('./img/order4.png')}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-around',
    backgroundColor: 'white'
  },
});


/* ------------------------------ 内部组件 InnerView ------------------------------ */
class InnerView extends Component {
  static propTypes = {
    title: PropTypes.string
  }

  static defaultProps = {
    iconName: null,
    title: ''
  }

  render() {
    return (
      <TouchableOpacity onPress={()=>{alert(this.props.title)}}>
        <View style={_styles.container}>
          <Image source={this.props.iconName} style={_styles.iconStyle} />
          <View>
              <Text style={_styles.textStyle}>{this.props.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

// 子组件 InnerView的样式
const _styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',

    width: 70,
    height: 70
  },
    iconStyle: {
      width: 30,
      height: 20,
      marginBottom:3
    },
    textStyle: {
      fontSize: 12
    }
});
