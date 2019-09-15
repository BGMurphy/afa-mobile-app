import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableHighlight
} from 'react-native';
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
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

// look up
// https://github.com/oblador/react-native-progress
export default class CalendarComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: '',
      currentUser: null
    };
  }

  render() {
    return (
      <View>
        <Calendar
          onDayPress={day => {
            this.props.onSetValue(day.dateString);
          }}
          markedDates={{
            [this.props.value]: {
              selected: true,
              selectedColor: '#2E96C7'
            }
          }}
          style={{
            // borderWidth: 0.5,
            // borderColor: '#d6d7da',
            borderRadius: 10
          }}
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
