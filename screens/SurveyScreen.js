import React from 'react';
import { View } from 'native-base';
import { StyleSheet } from 'react-native';
import firebase from 'firebase';

export default class SettingsScreen extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      // console.log(this.props);
      this.props.navigation.navigate(user ? 'Home' : 'SignUp');
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Some survey stuff</Text>
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
