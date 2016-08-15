import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  WebView,
  TouchableOpacity
} from 'react-native';

const TOKEN = '?uuid=5C7B6342814C7B496D836A69C872202B5DE8DB689A2D777DFC717E10FC0B4271&utm_term=6.6&utm_source=AppStore&utm_content=5C7B6342814C7B496D836A69C872202B5DE8DB689A2D777DFC717E10FC0B4271&version_name=6.6&userid=160495643&utm_medium=iphone&lat=23.134709&utm_campaign=AgroupBgroupD100Ghomepage_shoppingmall_detailH0&token=b81UqRVf6pTL4UPLLBU7onkvyQoAAAAAAQIAACQVmmlv_Qf_xR-hBJVMtIlq7nYgStcvRiK_CHFmZ5Gf70DR47KP2VSP1Fu5Fc1ndA&lng=113.373890&f=iphone&ci=20&msid=0FA91DDF-BF5B-4DA2-B05D-FA2032F30C6C2016-04-04-08-38594'

export default class MallCellDetail extends Component {
  state = {
    detailUrl: this.props.url + TOKEN
  }

  render() {
    // alert(this.props.url) // Home页面通过navigator.push的passProps传递
    return (
      <View style={styles.container}>
        {/*导航*/}
        {this.reanderNavBar()}

        {/*webView内容*/}
        <WebView
          automaticallyAdjustContentInsets={true}
          source={{uri: this.state.detailUrl}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          startInLoadingState={true}
        />
      </View>
    );
  }

  popToHome = () => {
    this.props.navigator.pop()
  }

  /* ---------- 渲染导航 ---------- */
  reanderNavBar() {
    return (
      <View style={styles.navStyle}>
        {/*返回按钮*/}
        <View style={styles.navBackBtnStyle}>
          <TouchableOpacity onPress={this.popToHome}>
            <Text style={styles.navBackTextStyle}>返回</Text>
          </TouchableOpacity>
        </View>

        {/* --- 中间 --- */}
        <View style={styles.navMiddleStyle}>
          <Text style={styles.navMiddleTextStyle}>购物中心详情</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  "navStyle": {
    "flexDirection": "row",
    "alignItems": "center",
    "justifyContent": "center",
    "height": 44,
    "backgroundColor": "rgba(255, 96, 0, 1)"
  },

  navBackBtnStyle: {
    "position": "absolute",
    "left": 10,
    "bottom": 10
  },
  navBackTextStyle: {
    "color": "white",
    "fontSize": 14,
    "fontWeight": "bold"
  },

  "navMiddleStyle": {},
  "navMiddleTextStyle": {
    "color": "white",
    "fontSize": 17,
    "fontWeight": "bold"
  }
});
