import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import firebaseConfig from './config/firebase';
import AuthenticationNavigator from './navigations/AuthenticationNavigator';

firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <AuthenticationNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
