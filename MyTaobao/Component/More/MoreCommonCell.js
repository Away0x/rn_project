/**
* 更多页子项，单元行
* index -- Launch -> Main(More)
* More(CommonCell * n)
* CommonCell
*/
import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity,
  Switch
} from 'react-native';

export default class CommonCell extends Component {
  // constructor(props) {
  //     super(props);
  //     // alert(this.state.switchValueIsOn)
  // }

  /* ---------- 初始化 BEGIN ---------- */
  static propTypes = {
    title: PropTypes.string, // 标题
    isSwitch: PropTypes.bool, // 是否展示开关, 默认展示箭头图片
    switchValueIsOn:  PropTypes.bool, // 用来判断switch是否默认值为true/false
    rightTitle: PropTypes.string, // cell右侧显示文字
  }

  static defaultProps = {
    title: '',
    isSwitch: false,
    switchValueIsOn: false,
    rightTitle: '',
  }

  state = {
    switchValueIsOn: this.props.switchValueIsOn, // 设置switch的value值
  }
  /* ---------- 初始化 END ---------- */

  /* ---------- 生命周期 BEGIN ---------- */
  /* ---------- 生命周期 END ---------- */

  /* ---------- 事件函数 BEGIN ---------- */
  // handle = (ev) => {} // 用这种方法在声明时就绑定this，因此组件中就不用.bind(this)了
  /* ---------- 事件函数 END ---------- */

  render() {
    return (
      <TouchableOpacity onPress={() => alert(this.props.title)}>
        <View style={styles.container}>
          {/*左边*/}
          <View style={styles.leftStyle}>
            <Text>{this.props.title}</Text>
          </View>

          {/*右边*/}
          <View style={styles.rightStyle}>
            {
              this.props.rightTitle.length > 0
              ?
                <Text style={{fontSize: 12, color: 'grey', marginRight: 5}}>{this.props.rightTitle}</Text>
              :
                null
            }
            {this.renderRightView(this.props.isSwitch)}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  /* ---------- 渲染 cell 右边的内容（箭头图片 / Switch开关） ---------- */
  renderRightView(isSwitch) {
    return (
      isSwitch
      ?
        <Switch
          style={styles.switchStyle}
          value={this.state.switchValueIsOn}
          onValueChange={() => {
            this.setState({
              switchValueIsOn: !this.state.switchValueIsOn
            });
          }}
        />

      :
        <Image source={require('./img/icon_cell_rightarrow.png')} style={styles.imageStyle} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    height: Platform.OS === 'ios' ? 40 : 35,
    borderBottomColor: '#dddddd',
    borderBottomWidth: 0.5,
    backgroundColor: 'white'
  },
  leftStyle: {
    marginLeft: 8
  },

  rightStyle: {
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },

  imageStyle: {
    width: 8,
    height: 13,
  },
});
