import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  ImageBackground
} from 'react-native';
import {
  Container,
  Card,
  CardItem,
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
import { LinearGradient } from 'expo-linear-gradient';
import Dimensions from 'Dimensions';
const HeaderColor = ['#0818A8', '#024FA8', '#2E96C7'];
const Color = ['#531CBA', '#0818A8', '#024FA8'];
let ScreenHeight = Dimensions.get('window').height;
let ScreenWidth = Dimensions.get('window').width;

const iconPaths = {
  'Aqua Blast': require('../assets/programs-aquablast.jpg'),
  'Aqua Vision': require('../assets/programs-aquavision.jpg')
};

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
    console.log('currentUser', currentUser);
    this.setState({ currentUser });
  }

  makeSelectProgram(index) {
    return () => {
      const { programs } = this.state;
      this.props.navigation.navigate('Calendar', {
        programId: programs[index].id
      });
    };
  }

  selectColor(name) {
    if(name == "Aqua Blast") {
      return ['#0818A8', '#024FA8', '#2E96C7'];
    } else {
      return ['#531CBA', '#0818A8', '#024FA8'];
    }
  }


  render() {
    const { currentUser } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <LinearGradient colors={HeaderColor} style={styles.gradient}>
          <Text style={{ color: '#fff', fontSize: 20 }}>Our Programs</Text>
        </LinearGradient>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 20,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              Hi,{' '}
              <Text style={{ fontSize: 20, color: '#0818A8' }}>
                {currentUser && currentUser.email}!
              </Text>
            </Text>

            <FlatList
              data={this.state.programs}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <ImageBackground
                  source={iconPaths[item.name]}
                  style={styles.img}
                >
                  <LinearGradient colors={this.selectColor(item.name)} style={styles.gradientCard}>
                    <View
                      style={{
                        width: ScreenWidth - 20,
                        height: ScreenHeight - 450,

                        marginBottom: 20,
                        borderRadius: 20
                      }}
                    >
                      <Text onPress={this.makeSelectProgram(index)}>
                        {item.name}
                      </Text>
                    </View>
                  </LinearGradient>
                </ImageBackground>
              )}
            />
          </View>
        </View>
      </View>

      // <View style={{ flex: 1 }}>
      //   <Container style={styles.container}>
      //     <LinearGradient colors={Color} style={styles.gradient}>
      //       <Text style={{ color: '#fff', fontSize: 20 }}>Our Programs</Text>
      //     </LinearGradient>
      //     <View
      //       style={{
      //         flex: 1,
      //         flexDirection: 'column',
      //         justifyContent: 'center',
      //         alignItems: 'center'
      //       }}
      //     >
      //       <Text style={{ textAlign: 'center' }}>
      //         Hi{' '}
      //         <Text style={{ fontSize: 20, color: '#0818A8' }}>
      //           {currentUser && currentUser.email}!
      //         </Text>
      //       </Text>

      //       <FlatList
      //         data={this.state.programs}
      //         keyExtractor={(item, index) => index.toString()}
      //         renderItem={({ item, index }) => (
      //           <Card>
      //             <CardItem>
      //               <Body>
      //                 <Text onPress={this.makeSelectProgram(index)}>
      //                   {item.name}
      //                 </Text>
      //               </Body>
      //             </CardItem>
      //           </Card>
      //         )}
      //       />
      //     </View>
      //   </Container>
      // </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lavender'
  },
  signOutButton: {
    alignSelf: 'center',
    textAlign: 'center',
    width: '90%'
  },

  gradient: {
    width: ScreenWidth,
    opacity: 0.8,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10
  },
  gradientCard: {
    opacity: 0.7,
    marginBottom: '5%',
    borderRadius: 20
  },
  img: {
    resizeMode: 'contain',
    width: ScreenWidth - 20,
    height: ScreenHeight - 450,
    marginBottom: 20,
    borderRadius: 20
  }
});
