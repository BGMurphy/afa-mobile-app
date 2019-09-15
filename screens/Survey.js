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

// look up
// https://github.com/oblador/react-native-progress
export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      uid: this.props.navigation.getParam('surveyId', null),
      currentUser: null,
      questionNumber: 0,
      numQuestions: 0,
      progressBar: 0,
      questions: [],
      answers: [],
      programId: 0,
      date: 0,
    };

    this.next = this.next.bind(this);
    this.responseType = this.responseType.bind(this);
    this.makeOnSetValue = this.makeOnSetValue.bind(this);
    this.fetchSurveyData = this.fetchSurveyData.bind(this);
    this.handleSurveyData = this.handleSurveyData.bind(this);
  }

  componentDidMount() {
    if (this.state.uid !== null) {
      this.fetchSurveyData(this.state.uid);
    }
  }

  fetchSurveyData(surveyId) {
    firebase.database().ref('/surveys/'+surveyId).once('value', (snapshot) => {
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
    const { questions, questionNumber, numQuestions,answers } = this.state
    if (answers[questionNumber] = '' && questions[questionNumber].mandatory === 'true') {
      return;
    }
    if (questionNumber + 2 <= numQuestions) {
      this.setState({
        questionNumber: questionNumber + 1,
        progressBar: (questionNumber + 2) / numQuestions
      });
    }
    // console.log(this.state.questionNumber)
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
          <Quiz progress={progressBar} questionNumber={questionNumber} questionText={questions[questionNumber].text} onNext={this.next}>

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

