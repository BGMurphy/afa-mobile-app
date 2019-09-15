import React, { Component } from 'react';
import { Alert, View, StyleSheet, Image, ImageBackground } from 'react-native';
import {
  Container,
  Header,
  Body,
  Title,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text,
  Icon
} from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
const Color = ['#0818A8', '#024FA8', '#2E96C7'];

export default class Intro extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <View style={styles.intro}>
            <Image
              style={styles.logoImg}
              source={require('../assets/AFA_Logo_Blue.png')}
            />
            <Title style={styles.title}>Aquafit For All</Title>
            <Text style={styles.detail}>
              Please take a one of our surveys to give us feedback on our
              programs!
            </Text>

            <Button
              rounded
              onPress={() => this.props.navigation.navigate('App')}
              style={styles.button}
            >
              <Text
                style={{
                  textAlign: 'center',
                  marginBottom: '5%',
                  fontSize: 20
                }}
              >
                Next
              </Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gradient: {
    opacity: 0.8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  intro: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    textAlign: 'center'
  },
  logoImg: {
    width: 150,
    height: 150
  },
  detail: {
    marginBottom: 15,
    marginTop: 10,
    fontSize: 16,
    color: '#000'
  },
  title: {
    fontSize: 25,
    marginTop: 20,
    color: '#000'
  },
  button: {
    position: 'absolute',
    bottom: 0,
    marginBottom: '10%',
    width: '80%',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0818A8'
  }
});
