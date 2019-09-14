import React from 'react';
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
import { View, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
import Database from '../config/database';
import firebase from 'firebase';

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: '',
      mobile: '',
      mobileForm: '',
      currentUser: null
    };

    this.handleSignOut = this.handleSignOut.bind(this);
    this.saveMobile = this.saveMobile.bind(this);
  }

  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
    // Get User Credentials
    let user = firebase.auth().currentUser;
    // Listen for mobile number changes
    Database.listenUserMobile(user.uid, mobileNumber => {
      this.setState({
        mobile: mobileNumber,
        mobileForm: mobileNumber
      });
    });

    this.setState({
      uid: user.uid
    });
  }
  handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(result => alert('sign out success'))
      .catch(error => console.error(error));
  };

  saveMobile() {
    // Set Mobile
    if (this.state.uid && this.state.mobileForm) {
      Database.setUserMobile(this.state.uid, this.state.mobileForm);
    }
  }

  render() {
    const { currentUser } = this.state;
    return (
      <View style={styles.container}>
        <Progress.Bar progress={0.3} width={200} />
        <Text>
          Hi{' '}
          <Text style={{ fontSize: 20, color: '#0818A8' }}>
            {currentUser && currentUser.email}!
          </Text>
        </Text>
        <Text>Hello UserId: {this.state.uid}</Text>
        <Text>Mobile Number (From Database): {this.state.mobile}</Text>
        <Input
          placeholder="Phone Number"
          autoCapitalize={'none'}
          autoCorrect={false}
          onChangeText={mobileForm => this.setState({ mobileForm })}
          style={{ fontSize: 16 }}
        />
        <Button onPress={this.saveMobile}>
          <Text>Save</Text>
        </Button>

        <Button
          style={styles.signOutButton}
          full
          rounded
          color="#e93766"
          onPress={this.handleSignOut}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Sign Out</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
