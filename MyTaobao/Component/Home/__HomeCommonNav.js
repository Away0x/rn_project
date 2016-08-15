/**
* 首页子项，公共的导航，MallCell都有用到
* index -- Launch -> Main(Home)
* Home(FamilyCell, OfferCell(CommonCell), ActivityCell(CommonCell), MallCell(CommonNav))
* CommonNav
*/
import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

export default class CommonNav extends Component {
  static propTypes = {
    leftTitle: PropTypes.string,
    rightTitle:  PropTypes.string
  }

  static defaultProps = {
    leftIcon: null,
    leftTitle: '',
    rightTitle: ''
  }

  render() {
    return (
      <TouchableOpacity onPress={()=>alert(this.props.leftTitle)}>
        <View style={styles.container}>
          {/*左*/}
          <View style={styles.leftStyle}>
            <Image source={this.props.leftIcon} style={{width: 35, height: 35, marginRight: 5}} />
            <Text style={{fontSize: 17}}>{this.props.leftTitle}</Text>
          </View>

          {/*右*/}
          <View style={styles.rightStyle}>
            <Text style={{color: 'grey'}}>{this.props.rightTitle}</Text>
            <Image source={require('./img/icon_cell_rightarrow.png')}
              style={{width: 8, height: 13, marginLeft: 5}}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    height: 44,
    borderBottomColor: '#e8e8e8',
    borderBottomWidth: 0.5,

    backgroundColor: 'white',
  },

    leftStyle: {
      flexDirection: 'row',
      alignItems: 'center',

      marginLeft: 8
    },

    rightStyle: {
      flexDirection: 'row',
      alignItems: 'center',

      marginRight: 8
    }
});
