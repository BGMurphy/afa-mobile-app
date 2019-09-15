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
import { View, StyleSheet, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';
import Database from '../config/database';
import firebase from 'firebase';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

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
        <View style={styles.header}>
          <Text style={styles.links}>
            About Us
          </Text>
          <Text style={styles.links}>
            Research
          </Text>
          <Text style={styles.links}>
            Programs
          </Text>
          <Text style={styles.links}>
            Contact Us
          </Text>
        </View>
       
        <Text style={styles.title}>
          Making aquatic therapy accessible for everyone
        </Text>

        <Text style={styles.text}>
          Our mission is to work with existing community groups/organizations to design and provide accessible aquatic exercise opportunities for people with disabilities/injuries who may not be able to access regular aquatic programs. We believe that physical fitness and social participation through aquatic exercises are things that should be enjoyed by everyone.
        </Text>

        <Button
          style={styles.signOut}
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
    flexDirection: 'column',
    backgroundColor: 'lavender',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    paddingLeft: width*0.1,
    paddingRight: width*0.1,
    paddingBottom: height*0.02
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingLeft: width*0.04,
    paddingRight: width*0.04,
    paddingBottom: height*0.02
  },
  signOut: {
    marginLeft: width*0.1,
    marginRight: width*0.1,
    top: height*0.1,
  },
  header: {
    alignItems: 'center',
    backgroundColor: 'blue',
    height: 70,
    width: width * 1,
    flex: 0.1,
    flexDirection: 'row',
    position: 'absolute',
    top: height*0.04
  },
  links: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
