import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  ImageBackground,
  TouchableHighlight,
  StatusBar
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
import getResponsesInCsv from '../utils/firebaseUtils';
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
      userIsAdmin: false,
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
      ],
      surveyCounts: {
        aquaVison: 0,
        aquaBlast: 0
      }
    };
    this.fetchResponseData = this.fetchResponseData.bind(this);
    this.handleResponseData = this.handleResponseData.bind(this);
    this.getResponseCounts = this.getResponseCounts.bind(this);
  }

  componentDidMount() {
    const { currentUser } = firebase.auth();
    console.log('currentUser', currentUser);
    // getResponsesInCsv('test1');
    this.setState({ currentUser });
    if (currentUser.email == 'admin@test.com') {
      this.setState({ userIsAdmin: true });
      this.fetchResponseData();
    }
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
    if (name == 'Aqua Blast') {
      return ['#0818A8', '#024FA8', '#2E96C7'];
    } else {
      return ['#531CBA', '#0818A8', '#024FA8'];
    }
  }

  fetchResponseData() {
    firebase
      .database()
      .ref('/responses/')
      .once('value', snapshot => {
        this.getResponseCounts(snapshot.val());
        //this.handleResponseData(snapshot.val());
      });
  }

  getResponseCounts(responses) {
    let visionCount = 0;
    let blastCount = 0;
    for (let responseKey in responses) {
      if (responses[responseKey].programId == 'program1') {
        visionCount += 1;
      }
      if (responses[responseKey].programId == 'program2') {
        blastCount += 1;
      }
    }
    //console.log('Counts:', visionCount, blastCount);
    this.setState({
      surveyCounts: {
        visionCount: visionCount,
        blastCount: blastCount
      }
    });
  }

  handleResponseData(survey) {
    const pages = survey;
    //console.log(pages);
    let resultResponses = [];
    for (let pageKey in pages) {
      const questions = pages[pageKey];
      for (let key in questions) {
        resultResponses.push(questions[key]);
      }
    }
    //console.log(resultResponses);
  }

  render() {
    const { currentUser } = this.state;
    return (
      <View style={{ flex: 1 }}>
        {this.state.userIsAdmin ? (
          <View>
            <LinearGradient colors={HeaderColor} style={styles.gradient}>
              <Text style={{ color: '#fff', fontSize: 20 }}>
                Data Management
              </Text>
            </LinearGradient>
            <Text style={{ color: '#000', fontSize: 18, marginLeft: 10 }}>
              Welcome,{' '}
              <Text style={{ color: '#0818A8', fontSize: 24 }}>admin</Text>!
              {'\n'}You can view responses from the following surveys:
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                marginTop: 10
              }}
            >
              <View style={styles.adminSurveySelector}>
                <TouchableHighlight>
                  <LinearGradient
                    colors={['#531CBA', '#0818A8', '#024FA8']}
                    style={styles.box}
                  >
                    <View>
                      <Text
                        style={{
                          fontSize: 24,
                          color: '#fff'
                        }}
                      >
                        Aqua Vision
                      </Text>
                      <Text
                        style={{
                          fontSize: 18,
                          color: '#fff'
                        }}
                      >
                        {this.state.surveyCounts.visionCount} Responses
                      </Text>
                    </View>
                  </LinearGradient>
                </TouchableHighlight>
                <Button
                  rounded
                  style={{
                    marginTop: 10,
                    width: 125,
                    color: 'green',
                    alignItems: 'center',
                    backgroundColor: 'green',
                    textAlign: 'center'
                  }}
                >
                  <Text>Export to csv</Text>
                </Button>
              </View>
              <View style={styles.adminSurveySelector}>
                <TouchableHighlight>
                  <LinearGradient
                    colors={['#0818A8', '#024FA8', '#2E96C7']}
                    style={styles.box}
                  >
                    <View>
                      <Text
                        style={{
                          fontSize: 20,
                          color: '#fff'
                        }}
                      >
                        Aqua BLAST
                      </Text>
                      <Text
                        style={{
                          fontSize: 18,
                          color: '#fff'
                        }}
                      >
                        {this.state.surveyCounts.blastCount} Responses
                      </Text>
                    </View>
                  </LinearGradient>
                </TouchableHighlight>
                <Button
                  rounded
                  style={{
                    marginTop: 10,
                    width: 125,
                    color: 'green',
                    alignItems: 'center',
                    backgroundColor: 'green',
                    textAlign: 'center'
                  }}
                >
                  <Text>Export to csv</Text>
                </Button>
              </View>
            </View>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <Header style={{ backgroundColor: '#0818A8' }}>
              <Text style={{ color: '#fff', fontSize: 20, paddingTop: 10 }}>
                Our Programs
              </Text>
            </Header>

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
                    alignItems: 'center',
                    marginTop: 10
                  }}
                >
                  Hi,{' '}
                  <Text style={{ fontSize: 20, color: '#0818A8' }}>
                    {currentUser && currentUser.email}!
                  </Text>
                </Text>

                <FlatList
                  style={{ top: '5%' }}
                  data={this.state.programs}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      onPress={this.makeSelectProgram(index)}
                      activeOpacity={0.8}
                    >
                      <ImageBackground
                        source={iconPaths[item.name]}
                        imageStyle={{ borderRadius: 20, opacity: 0.5 }}
                        style={styles.img}
                      >
                        <LinearGradient
                          colors={this.selectColor(item.name)}
                          style={styles.gradientCard}
                        >
                          <View
                            style={{
                              width: ScreenWidth - 20,
                              height: ScreenHeight - 470,
                              marginBottom: 20,
                              borderRadius: 20
                            }}
                          >
                            <Text
                              style={{
                                color: '#fff',
                                fontSize: 25,
                                paddingLeft: 15,
                                paddingTop: 15,
                                fontWeight: 'bold'
                              }}
                            >
                              {item.name}
                            </Text>
                            <Text
                              style={{
                                color: '#fff',
                                fontSize: 18,
                                paddingLeft: 15,
                                paddingTop: 15
                              }}
                            >
                              Aqua BLAST project aims to improve physical
                              activity and social connections for stroke
                              survivors in the Lower Mainland.
                            </Text>
                            <Button
                              rounded
                              style={{
                                backgroundColor: '#EFB215',
                                width: '65%',
                                zIndex: 200,
                                marginLeft: '30%',
                                opacity: 1,
                                marginTop: 30
                              }}
                              onPress={this.makeSelectProgram(index)}
                            >
                              <Text>Click here to start survey!!</Text>
                            </Button>
                          </View>
                        </LinearGradient>
                      </ImageBackground>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          </View>
        )}
      </View>
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

  box: {
    width: 150,
    opacity: 0.8,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    borderRadius: 20
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
    borderRadius: 20,
    resizeMode: 'contain',
    width: ScreenWidth - 20,
    height: ScreenHeight - 450,
    marginBottom: 20,
    borderRadius: 20
  },
  adminSurveySelector: {
    height: ScreenHeight * 0.4,
    width: ScreenWidth * 0.4,
    marginBottom: 20,
    width: ScreenWidth * 0.4
  }
});
