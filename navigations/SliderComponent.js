import React from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, TouchableHighlight, Picker } from 'react-native';
import {
  Container,
  Header,
  Body,
  Title,
  Content,
  Form,
  Item,
  Button,
  Input,
  Text
} from 'native-base';
import * as Progress from 'react-native-progress';
import StarRating from 'react-native-star-rating';
import Database from '../config/database';
import firebase from 'firebase';
import Dimensions from 'Dimensions';
let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;


// look up
// https://github.com/oblador/react-native-progress
export default class SliderComponent extends React.Component {
  static defaultProps = {
    value:0
  }

  render() {
    return (
      <View>

        <StarRating
          style={{width:'80%'}}
          disabled={false}
          emptyStar={'circle-thin'}
          fullStar={'circle'}
          iconSet={'FontAwesome'}
          maxStars={this.props.size}
          rating={this.props.value}
          selectedStar={(rating) => this.props.onSetValue(rating)}
          fullStarColor={'#0818A8'}
        />

      </View>
    );
  }
}
const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   flexDirection: 'column',
  //   backgroundColor: 'lavender',
  //   justifyContent: 'center',
  //   alignItems: 'center'
  // },
});
