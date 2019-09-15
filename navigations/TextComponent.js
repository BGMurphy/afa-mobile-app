import React from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, TouchableHighlight } from 'react-native';
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
import Database from '../config/database';
import firebase from 'firebase';
import Dimensions from 'Dimensions';
let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;


// look up
// https://github.com/oblador/react-native-progress
export default class TextComponent extends React.Component {

  render() {
    const { value, onSetValue } = this.props;
    return (
      <View>
        
        <TextInput
          style={{height: 40}}
          placeholder="Please enter your answer"
          onChangeText={text => onSetValue(text)}
          value={value}
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
