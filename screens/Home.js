import React from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
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

// look up
// https://github.com/oblador/react-native-progress
export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {},
      programs: [
        {
          id: 0,
          name: 'Aqua Blast',
          img: '...'
        },
        {
          id: 1,
          name: 'Aqua Vision',
          img: '...'
        }
      ]
    };

  }

  componentDidMount() {
    const { currentUser } = firebase.auth();
    console.log('currentUser', currentUser)
    this.setState({ currentUser })
  }

  makeSelectProgram(index) {
    return () => {
      const { programs } = this.state;
      this.props.navigation.navigate('Survey', {
        programId: programs[index].id
      })
    }
  }

  render() {
    const {currentUser} = this.state;
    return (
      <View style={styles.container}>
        <Text>
          Hi{' '}
          <Text style={{ fontSize: 20, color: '#0818A8' }}>
            {currentUser && currentUser.email}!
          </Text>
        </Text>
        <Text>
          Our Programs:
        </Text>

        <FlatList
          data={this.state.programs}
          renderItem={({ item, index }) =>
            <Text
              onPress={this.makeSelectProgram(index)}>{item.name}</Text>}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'lavender',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signOutButton: {
    alignSelf: 'center',
    textAlign: 'center',
    width: '90%'
  }
});
