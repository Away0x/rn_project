/**
* 首页子项, 分类块
* index -- Launch -> Main(Home)
* Home(FamilyCell, OfferCell(CommonCell), ActivityCell(CommonCell), MallCell(CommonNav, _MallItem))
* FamilyCell(_FamilyListView) _为内部组件
*/
import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  ListView,
  Platform,
  TouchableOpacity,
  Dimensions
} from 'react-native';
const {width, height, scale} = Dimensions.get("window");

// 外部数据
import FamilyData from './data/Data_HomeFamilyData';

export default class FamilyCell extends Component {
  state = {
      activePage: 0
  }

  // 当ScrollView一帧滚动结束时调用
  handleScrollAnimate = (ev) => {
    // 求出当前页码
    let currentPage = Math.floor(ev.nativeEvent.contentOffset.x / width);
    // 更新状态机
    this.setState({
      activePage: currentPage
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {/*内容*/}
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          onScroll={this.handleScrollAnimate}
        >
          {this.renderScrollViewItem()}
        </ScrollView>

        {/*页码指示*/}
        <View style={styles.indicatorViewStyle}>
          {/*<Text>{JSON.stringify(FamilyData[0][0])}</Text> 调试用*/}
          {this.renderScrollViewItemIndicator()}
        </View>
      </View>
    );
  }

  // ScrollView内部的内容组件
  renderScrollViewItem() {
    // 组件数组
    let itemArr = [];

    // 遍历数据创建组件
    FamilyData.forEach((item, index) => {
      itemArr.push(
          <FamilyListView
            key={index}
            dataArr={item}
          />
      );
    });

    return itemArr;
  }

  // ScrollView内部的内容组件的指示器
  renderScrollViewItemIndicator() {
    // 指示器数组
    let indicatorArr = [];
    let style;

    for (let i =0; i < 2; i++) {
      color = (i === this.state.activePage) ? {color: 'orange'} : {color: 'grey'}
      indicatorArr.push(
        <Text key={i} style={[{fontSize: 30}, color]}>&bull;</Text>
      );
    }
    return indicatorArr;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },

    indicatorViewStyle: {
      flexDirection: 'row',
      justifyContent: 'center'
    }
});





/* ------------------------------ 内部组件 FamilyListView ------------------------------ */
let cols = 5;
// let cellWH = Platform.OS === 'ios' ? 70 : 60;
let cellWH = 70;
let vMargin = (width - cellWH * cols) / (cols + 1);
class FamilyListView extends Component {
  constructor(props) {
    super(props);

    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.dataArr)
    };
  }

  static PropTypes = {
    dataArr: PropTypes.array
  }

  static defaultProps = {
    dataArr: []
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        contentContainerStyle={_styles.listViewStyle}
      />
    );
  }

  // 具体的cell
  renderRow(rowData) {
    return (
      <View style={_styles.rowStyle}>
        <TouchableOpacity onPress={()=>alert(rowData.title)}>
          <Image source={rowData.image} style={{width: 52, height: 52}} />
        </TouchableOpacity>
        <Text style={{fontSize: 14, color: 'grey'}}>{rowData.title}</Text>
      </View>
    );
  }
}

const _styles = StyleSheet.create({
  listViewStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width
  },
    rowStyle: {
      // backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
      width: cellWH,
      height: cellWH,
      marginTop: 10,
      marginLeft: vMargin
    }
});
