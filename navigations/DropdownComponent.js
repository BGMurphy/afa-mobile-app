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
import Database from '../config/database';
import firebase from 'firebase';
import Dimensions from 'Dimensions';
let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;


// look up
// https://github.com/oblador/react-native-progress
export default class TextComponent extends React.Component {
  static defaultProps = {
    value:""
  }

  render() {
    console.log(this.props.options)
    let options = this.props.options.map( (s, i) => {
      return <Picker.Item key={i} value={s} label={s} />
    });
    return (
      <View style={{borderRadius: 10, borderWidth: 1, borderColor: '#bdc3c7', overflow: 'hidden', marginLeft: 10, marginRight: 10}}>
        
        <Picker
          selectedValue={this.props.value}
          onValueChange={ (service) => ( this.props.onSetValue(service) ) } >

          {options}

        </Picker>

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
