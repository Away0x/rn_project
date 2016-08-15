/**
* 首页子项, 活动块
* index -- Launch -> Main(Home)
* Home(FamilyCell, OfferCell(CommonCell), ActivityCell(CommonCell), MallCell(CommonNav, _MallItem))
* ActivityCell(CommonCell)
*/
import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions
} from 'react-native';
const {width, height, scale} = Dimensions.get("window");

// 外部数据
import DATA from './data/Data_HomeActivityData';

import CommonCell from './__HomeCommonCell';

export default class ActivityCell extends Component {
  static propTypes = {
    popTopHome: PropTypes.func // home页面传递的，用于回到home的回调(导航)
  }

  static defaultProps = {
    popTopHome: null
  }

  render() {
    return (
      <View style={styles.container}>
        {/*上*/}
        <View style={styles.topStyle}>
          {/*左*/}
          <View>
            <Text style={styles.titleStyle}>最高立减25</Text>
            <Text style={styles.subTitleStyle}>马上加入吧 会员专享</Text>
          </View>

          {/*右*/}
          <Image source={require('./img/nsj.png')} style={{width: 100, height: 100, resizeMode: 'contain'}} />
        </View>


        {/*下*/}
        {this.renderBottomCells()}
      </View>
    );
  }

  // 继续往父级界面传递数据
  popToTopView(url){
     // 继续执行回调函数
     this.props.popTopHome(url);
  }

  // 处理图像的尺寸
  dealWithImageUrl(url) {
    if (url.search('w.h') === -1) { // 没找到w.h, 正常返回
      return url;
    }
    else {
      return url.replace('w.h', '200.150');
    }
  }

  // 渲染下部View的各个cell
  renderBottomCells() {
    let cellArr = []; // 组件数组
    let data = DATA.data;

    // data.forEach((item, index) => {
    //   cellArr.push(
    //     <CommonCell key={index}
    //       title={item.maintitle}
    //       subTitle={item.deputytitle}
    //       rightImage={{uri: this.dealWithImagUrl(item.imageurl)}}
    //       titleColor={item.typeface_color}
    //     />
    //   );
    // });

    // 依靠wrap的换行在安卓上有些异常，里面得套两个view才显示正常,所以抛弃了循环的方案
    cellArr.push(
      <View style={styles.bottomStyle} key={1}>
        <View>
          <CommonCell
            title={data[0].maintitle}
            subTitle={data[0].deputytitle}
            rightImage={{uri: this.dealWithImageUrl(data[0].imageurl)}}
            titleColor={data[0].typeface_color}

            callBackClickCell={(url)=>this.popToTopView(url)}
            tplurl={data[0].tplurl}
          />
          <CommonCell
            title={data[1].maintitle}
            subTitle={data[1].deputytitle}
            rightImage={{uri: this.dealWithImageUrl(data[1].imageurl)}}
            titleColor={data[1].typeface_color}

            callBackClickCell={(url)=>this.popToTopView(url)}
            tplurl={data[1].tplurl}
          />
      </View>
      <View>
        <CommonCell
          title={data[2].maintitle}
          subTitle={data[2].deputytitle}
          rightImage={{uri: this.dealWithImageUrl(data[2].imageurl)}}
          titleColor={data[2].typeface_color}

          callBackClickCell={(url)=>this.popToTopView(url)}
          tplurl={data[2].tplurl}
        />
        <CommonCell
          title={data[3].maintitle}
          subTitle={data[3].deputytitle}
          rightImage={{uri: this.dealWithImageUrl(data[3].imageurl)}}
          titleColor={data[3].typeface_color}

          callBackClickCell={(url)=>this.popToTopView(url)}
          tplurl={data[3].tplurl}
        />
      </View>
    </View>
    );

    return cellArr;
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12
  },

    topStyle: {
      height: 59,
      marginBottom: 1,

      backgroundColor: 'white',

      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around'
    },
      titleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red'
      },
      subTitleStyle: {
        color: 'grey'
      },


    bottomStyle: {
      flexDirection: 'row',
      // flexWrap: 'wrap'
    }
});
