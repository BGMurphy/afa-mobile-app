import React from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, TouchableHighlight, ActivityIndicator } from 'react-native';
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
import Quiz from './Quiz';

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

let questions = [
  {
    "qid": "1",
    "text": "QUESTION1",
    "type": "text"
  },
  {
    "qid": "2",
    "text": "QUESTION2",
    "type": "dropdown",
    "options": ['yes', 'no'],
  },
  // {
  //   "qid": "3",
  //   "text": "QUESTION3",
  //   "type": "text",
  // },
  {
    "qid": "2",
    "text": "QUESTION2",
    "type": "dropdown",
    "options": ['yes', 'no', 'ben'],
  },
  {
    "qid": "4",
    "text": "QUESTION4",
    "type": "dropdown",
    "options": ['yes', 'no', 'maybe', 'SHANYUUU'],
  },
  {
    "qid": "5",
    "text": "QUESTION5",
    "type": "calendar"
  },
];

// look up
// https://github.com/oblador/react-native-progress
export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      uid: this.props.navigation.getParam('surveyId', null),
      currentUser: null,
      // questionObject: questions,
      questionNumber: 0,
      numQuestions: 0,
      progressBar: 0,
      questions: [],
      answers: [],
    };

    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.responseType = this.responseType.bind(this);
    // this.handleSignOut = this.handleSignOut.bind(this);
    // this.saveMobile = this.saveMobile.bind(this);
    this.makeOnSetValue = this.makeOnSetValue.bind(this);
    this.fetchSurveyData = this.fetchSurveyData.bind(this);
    this.handleSurveyData = this.handleSurveyData.bind(this);
  }

  componentDidMount() {
    console.log('this.state.uid', this.state.uid)
    if (this.state.uid !== null) {
      this.fetchSurveyData(this.state.uid);
    }
  }

  fetchSurveyData(surveyId) {
    firebase.database().ref('/surveys/test1').once('value', (snapshot) => {
      this.handleSurveyData(snapshot.val());
    });
  }

  handleSurveyData(survey) {
    const pages = survey.surveyData;
    let resultQuestions = [];
    for (let pageKey in pages) {
      const questions = pages[pageKey].questions;
      for (let key in questions) {
        resultQuestions.push(questions[key])
      }
    }
    this.setState({
      loading: false,
      questions: resultQuestions,
      numQuestions: resultQuestions.length,
      progressBar: 1 / resultQuestions.length
    })
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
    const fieldName = 'field' + index;
    // const newAnswers = 
    return (value) => {
      this.setState(state => {
        let updatedAnswers = state.answers;
        updatedAnswers[index] = value;
        return { answers: updatedAnswers }
      })
    }
  }

  next() {
    // console.log('this.state.answers',this.state.answers)
    if (this.state.questionNumber + 2 <= this.state.numQuestions) {
      this.setState({
        questionNumber: this.state.questionNumber + 1,
      });
    }
    this.setState({
      progressBar: (this.state.questionNumber + 2) / this.state.numQuestions
    });
    // console.log(this.state.questionNumber)
  }

  previous() {
    // console.log('this.state.answers',this.state.answers)
    if (this.state.questionNumber > 0) {
      this.setState({
        questionNumber: this.state.questionNumber - 1,
        progressBar: (this.state.questionNumber) / this.state.numQuestions
      });
    }

    console.log(this.state.questionNumber)
    console.log(this.state.progressBar)
  }

  responseType(questionIndex) {

    if (this.state.questions[questionIndex].type == "text") {
      return <TextComponent />
    } else if (this.state.questions[questionIndex].type == "radio") {
      return <DropdownComponent value={this.state.answers[questionIndex] || ''} onSetValue={this.makeOnSetValue(questionIndex)} options={this.state.questions[questionIndex].options} />
    } else {
      return <CalendarComponent />
    }

  }

  render() {
    const { currentUser, loading, progressBar, questionNumber, questions } = this.state;
    if (loading) {
      return <ActivityIndicator />
    } else {
      return (
          <Quiz progress={progressBar} questionNumber={questionNumber} questionText={questions[questionNumber].text} onNext={this.next} onPrevious={this.previous}>

            {this.responseType(questionNumber)}

            {/* <TouchableHighlight
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
            </TouchableHighlight> */}
          </Quiz>



      );
    }
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
