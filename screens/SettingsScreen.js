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
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Linking,
  ImageBackground,
  ActivityIndicator
} from 'react-native';
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
      currentUser: null,
      loading: true
    };

    this.handleSignOut = this.handleSignOut.bind(this);
    this.saveMobile = this.saveMobile.bind(this);
  }

  componentDidMount() {
    const images = firebase.storage().ref();
    const login_background = images.child('bg.jpg');
    let promises = [];
    promises.push(login_background.getDownloadURL());
    Promise.all(promises).then(images => {
      this.setState({
        login_background: images[0],
        loading: false
      });
    });

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
    if (this.state.loading) return <ActivityIndicator />;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.links}
            onPress={() => {
              Linking.openURL('https://aquafitforall.org/#/aboutus');
            }}
          >
            <Text style={styles.linkText}>About Us</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.links}
            onPress={() => {
              Linking.openURL('https://aquafitforall.org/#/research');
            }}
          >
            <Text style={styles.linkText}>Research</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.links}
            onPress={() => {
              Linking.openURL('https://aquafitforall.org/#/programs');
            }}
          >
            <Text style={styles.linkText}>Programs</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.links}
            onPress={() => {
              Linking.openURL('https://aquafitforall.org/#/contactus');
            }}
          >
            <Text style={styles.linkText}>Contact Us</Text>
          </TouchableOpacity>
        </View>

        <ImageBackground
          source={{ uri: this.state.login_background }}
          imageStyle={{ opacity: 0.6 }}
          style={styles.img}
        >
          <View>
            <Text style={styles.title}>
              {'\n'}
              Making aquatic therapy accessible for everyone
            </Text>

            <Text style={styles.text}>
              Our mission is to work with existing community
              groups/organizations to design and provide accessible aquatic
              exercise opportunities for people with disabilities/injuries who
              may not be able to access regular aquatic programs. {'\n'}We
              believe that physical fitness and social participation through
              aquatic exercises are things that should be enjoyed by everyone.
            </Text>

            <Button
              style={styles.signOut}
              full
              rounded
              color="#e93766"
              onPress={this.handleSignOut}
            >
              <Text style={{ color: 'white', textAlign: 'center' }}>
                Sign Out
              </Text>
            </Button>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',

    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    top: height * 0.03,
    fontSize: 16,
    paddingLeft: width * 0.1,
    paddingRight: width * 0.1,
    paddingBottom: height * 0.02,
    paddingTop: height * 0.02,
    fontWeight: 'bold',
    color: '#000',

    marginRight: 15,
    marginLeft: 15

    // textShadowColor: 'black',
    // textShadowRadius: 10
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    paddingLeft: width * 0.04,
    paddingRight: width * 0.04,
    paddingBottom: height * 0.02,
    color: '#0818A8',
    // textShadowColor: 'black',
    // textShadowRadius: 20,
    left: width * 0.03
  },
  signOut: {
    marginLeft: width * 0.1,
    marginRight: width * 0.1,
    top: height * 0.09,
    backgroundColor: 'red'
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0818A8',
    height: 70,
    width: width * 1,
    flex: 0.1,
    flexDirection: 'row',
    position: 'absolute',
    top: height * 0.04
  },
  links: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  linkText: {
    color: 'white'
  },
  img: {
    resizeMode: 'contain',
    width: width,
    height: height * 0.79,
    marginBottom: 20,
    marginTop: width * 0.33
  }
});
