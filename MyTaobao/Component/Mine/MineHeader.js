/**
* 我的页子项，头部
* index -- Launch -> Main(Mine)
* Mine(Header, CommonCell * n)
* Header
*/
import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity,
  Dimensions
} from 'react-native';
const {width, height, scale} = Dimensions.get("window");

export default class Header extends Component {
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

        {/*上部*/}
        <View style={styles.topStyle}>
          {/*左*/}
          <View style={styles.topLeftStyle}>
            <Image source={require('./img/see.png')} style={styles.topLeftLogoStyle} />
            <View style={styles.topLeftNameStyle}>
              <Text style={{fontSize:18, color:'white', fontWeight:'bold'}}>翌茗电商</Text>
              <Image source={require('./img/avatar_vip.png')} style={{marginLeft:3, width: 15, height: 15}} />
            </View>
          </View>

          {/*右*/}
          <TouchableOpacity>
            <View style={styles.topRightStyle}>
              <Image source={require('./img/icon_cell_rightarrow.png')} style={{marginLeft: 8, width:8, height:13}} />
            </View>
          </TouchableOpacity>
        </View>


        {/*下部*/}
        <View style={styles.bottomStyle}>
          <BottomCell number={100} title={'优惠券'} />
          <BottomCell number={12} title={'评价'} />
          <BottomCell number={50} title={'收藏'} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? 200 : 150,
    backgroundColor:'rgba(255,96,0,1.0)'
  },

    topStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 25
    },
      topLeftStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8
      },
        topLeftLogoStyle: {
          width:70,
          height:70,
          borderRadius:35,
          borderWidth:3,
          borderColor:'rgba(0,0,0,0.2)'
        },
        topLeftNameStyle: {
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 8,
          width: width * 0.72
        },

      topRightStyle: {
        marginRight: 8,
        flexDirection: 'row',
        alignItems: 'center'
      },


      bottomStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',

        position: 'absolute',
        bottom: 0
      }
});


/* ------------------------------ 内部组件 BottomCell ------------------------------ */
class BottomCell extends Component {
  static propTypes = {
    number: PropTypes.number,
    title: PropTypes.string
  }

  static defaultProps = {
    number: 0,
    title: ''
  }

  render() {
    return (
      <TouchableOpacity onPress={() => alert(this.props.title)}>
        <View style={_styles.container}>
          <Text style={{color:'white', fontSize: 13}}>{this.props.number}</Text>
          <Text style={{color:'white', fontSize: 13}}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const _styles = StyleSheet.create({
  container: {
    width:(width/3)+1,
    height:40,
    backgroundColor:'rgba(0, 0, 0, 0.15)',

    justifyContent:'center',
    alignItems:'center',

    borderRightWidth:1,
    borderRightColor:'white'
  },
});
