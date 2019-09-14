import React from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, TouchableHighlight } from 'react-native';
import TextComponent from '../navigations/TextComponent';
import DropdownComponent from '../navigations/DropdownComponent';
import CalendarComponent from '../navigations/CalendarComponent';
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
import Dimensions from 'Dimensions';
let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

let questions = [
  {
    "qid" : "1",
    "text" : "QUESTION1",
    "type" : "text"
  },
  {
    "qid" : "2",
    "text" : "QUESTION2",
    "type" : "dropdown",
    "options" : ['yes', 'no'],
  },
  {
    "qid" : "3",
    "text" : "QUESTION3",
    "type" : "dropdown",
    "options" : ['yes', 'no', 'maybe', 'SHANYUUU'],
  },
  {
    "qid" : "4",
    "text" : "QUESTION4",
    "type" : "calendar"
  },
];

// look up
// https://github.com/oblador/react-native-progress
export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: '',
      currentUser: null,
      questionObject: questions,
      questionNumber: 0,
      numQuestions: questions.length,
      progressBar: 1 / questions.length,
      questions: questions,
      answers:new Array(questions.length)

    };

    this.next = this.next.bind(this);
    this.responseType = this.responseType.bind(this);
    // this.handleSignOut = this.handleSignOut.bind(this);
    // this.saveMobile = this.saveMobile.bind(this);
    this.makeOnSetValue = this.makeOnSetValue.bind(this)
  }

  //componentDidMount() {
  //   const { currentUser } = firebase.auth();
  //   this.setState({ currentUser });
  //   // Get User Credentials
  //   let user = firebase.auth().currentUser;
  //   // Listen for mobile number changes
  //   Database.listenUserMobile(user.uid, mobileNumber => {
  //     this.setState({
  //       mobile: mobileNumber,
  //       mobileForm: mobileNumber
  //     });
  //   });

  //   this.setState({
  //     uid: user.uid
  //   });
  
  //}

  // handleSignOut = () => {
  //   firebase
  //     .auth()
  //     .signOut()
  //     .then(result => alert('sign out success'))
  //     .catch(error => console.error(error));
  // };

  // saveMobile() {
  //   // Set Mobile
  //   if (this.state.uid && this.state.mobileForm) {
  //     Database.setUserMobile(this.state.uid, this.state.mobileForm);
  //   }
  // }

  makeOnSetValue(index) {
    return (value) => {
      this.setState(state => { 
        let updatedAnswers = state.answers;
        updatedAnswers[index] = value;
        return {answers: updatedAnswers}
      })
    }
  }

  next() {
    if(this.state.questionNumber + 2 <= this.state.numQuestions) {
      this.setState({
        questionNumber: this.state.questionNumber + 1,
      });
    }
    this.setState({
      progressBar: (this.state.questionNumber + 2) / this.state.numQuestions
    });
    console.log(this.state.questionNumber)
  }

  responseType(questionIndex) {

    if(this.state.questions[questionIndex].type == "text") {
      return <TextComponent />
    } else if(this.state.questions[questionIndex].type == "dropdown") {
      return <DropdownComponent onSetValue={this.makeOnSetValue(questionIndex)} value={this.state.answers[questionIndex]} options={this.state.questions[questionIndex].options}/>
    } else {
      return <CalendarComponent />
    }

  }

  render() {
    const { currentUser } = this.state;
    return (
      <View style={styles.container}>
        <Progress.Bar progress={this.state.progressBar} width={200} />
        <Text>
          {this.state.questionObject[this.state.questionNumber].text}
        </Text>

        {this.responseType(this.state.questionNumber)}

        <TouchableHighlight
          onPress={this.next}
          style={{
            backgroundColor: '#21ce99',
            width: width * 0.4,
            alignSelf: 'center',
            height: height * 0.05,
            borderRadius: 20,
            justifyContent: 'center',
            top: height * 0.02
          }}
        >
          <Text style={{ color: 'white', alignSelf: 'center' }}>
            Submit
          </Text>
        </TouchableHighlight>


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
