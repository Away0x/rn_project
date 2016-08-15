import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  WebView
} from 'react-native';

import CommonNav from '../CommonNav';

// http://c.m.163.com/nc/article/BU237ASA002534NU/full.html
const API_URL_HEAD = 'http://c.m.163.com/nc/article/';
const API_URL_TAIL = '/full.html';

export default class NewDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      detailData: ''
    }
  }

  static propTypes = {
    api_url_id: PropTypes.string
  }

  static defaultProps = {
    api_url_id: ''
  }

  componentDidMount() {
    let api = API_URL_HEAD + this.props.api_url_id + API_URL_TAIL;
    // alert(api)
    fetch(api)
      .then((res) => res.json())
      .then((resJson) => {
        // 处理拿到的数据
        let allData = resJson[this.props.api_url_id];
        let bodyHTML = allData['body'];
        // 拿图片数据
        if (allData['img'].length > 0) {
          for (let i = 0; i < allData['img'].length; i++) {
            let img = allData['img'][i];
            let ref = img['ref'];
            let src = img['src'];
            // 替换body中图片占位符
            let imgHTML = `<img src="${src}" width="100%">`;
            bodyHTML = bodyHTML.replace(ref, imgHTML)
          }
        }

        this.setState({
          detailData: bodyHTML
        })
        // alert(this.state.detailData)
      })
      .catch((err) => {
        alert('请求数据失败')
      })
  }

  render() {
    return (
      <View style={styles.container}>
        {/*导航*/}
        <CommonNav title={this.props.title} leftTitle={'返回'} func={this.popToHome} />

        {/*内容*/}
        <WebView
          style={{height: 10000}}
          //source={{uri: 'http://www.baidu.com'}}
          source={{html: this.state.detailData}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      </View>
    );
  }

  popToHome = () => {
    this.props.navigator.pop();
    // console.log(this.state.detailData);
  }
}

const styles = StyleSheet.create({
  constainer: {
    flex: 1
  },
});
