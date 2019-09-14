import React from 'react';
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
  Text
} from 'native-base';
import { StyleSheet, ImageBackground, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components';
import Dimensions from 'Dimensions';
import firebase from 'firebase';
let ScreenHeight = Dimensions.get('window').height;
let ScreenWidth = Dimensions.get('window').width;

// const Color = ['#0089BA', '#3C80C0', '#6574BD'];
const Color = ['#0818A8', '#024FA8', '#2E96C7'];
const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ItemWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  handleSignUp = () => {
    const { email, password } = this.state;

    // Signup with firebase
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        this.setState({ email: '', password: '' });
        alert('success');
        // Move after Signup
      })
      .catch(error => alert(error));
  };

  handleLogin = () => {
    const { email, password } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        this.props.navigation.navigate('App');
      })
      .catch(error => {
        console.log(error.message);
        alert('Please type correct login information');
      });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require('../assets/programs-aquavision.jpg')}
          style={styles.backgroundImg}
        >
          <LinearGradient colors={Color} style={styles.gradient}>
            <Content contentContainerStyle={{ alignItems: 'center' }}>
              <View style={styles.intro}>
                <Image
                  style={styles.logoImg}
                  source={require('../assets/AFA_Logo_White.png')}
                />
                <Title style={styles.title}>Aquafit For All</Title>
                <Text style={styles.detail}>
                  Hi, we're Aquafit for All Association. We organize aquatic
                  opportunities for individuals of all ages and abilities. We
                  would love your opinion on our programs!
                </Text>
              </View>

              <Form style={styles.form}>
                <ItemWrapper contentContainerStyle={{ alignItems: 'center' }}>
                  <Item rounded style={styles.item}>
                    <Input
                      placeholder="Email"
                      autoCapitalize={'none'}
                      autoCorrect={false}
                      onChangeText={email => this.setState({ email })}
                      style={{ fontSize: 16 }}
                    />
                  </Item>
                  <Item rounded style={styles.item}>
                    <Input
                      placeholder="Password"
                      autoCapitalize={'none'}
                      secureTextEntry={true}
                      onChangeText={password => this.setState({ password })}
                      style={{ fontSize: 16 }}
                    />
                  </Item>
                </ItemWrapper>

                <Button
                  style={styles.signUpButton}
                  full
                  rounded
                  color="#e93766"
                  onPress={this.handleSignUp}
                >
                  <Text style={{ color: 'white' }}>Sign Up</Text>
                </Button>

                <Button
                  style={styles.logInButton}
                  full
                  rounded
                  color="#2D90F5"
                  onPress={this.handleLogin}
                >
                  <Text style={{ color: 'white' }}>Log In</Text>
                </Button>
                {/* <Wrapper>
              <Text>
                Already have an account?{' '}
                <Text
                  onPress={this.handleLogin}
                  style={{ color: '#2D90F5', fontSize: 20 }}
                >
                  Login
                </Text>
              </Text>
            </Wrapper> */}
              </Form>
            </Content>
          </LinearGradient>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImg: {
    width: ScreenWidth,
    height: ScreenHeight
  },
  intro: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    textAlign: 'center'
  },
  gradient: {
    opacity: 0.8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoImg: {
    width: 100,
    height: 100
  },
  detail: {
    marginBottom: 15,
    marginTop: 15,
    fontSize: 16,
    color: '#fff'
  },
  title: {
    color: '#fff',
    fontSize: 25,
    marginTop: 10
  },
  form: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  signUpButton: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 15,
    width: '90%'
  },
  logInButton: {
    marginBottom: 15,
    alignSelf: 'center',
    width: '90%'
  },
  item: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    marginBottom: 5,
    backgroundColor: '#e0e0e0',
    opacity: 1
  }
});
