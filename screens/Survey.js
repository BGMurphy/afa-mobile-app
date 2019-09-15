import React from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, TouchableHighlight, ActivityIndicator } from 'react-native';
import TextComponent from '../navigations/TextComponent';
import DropdownComponent from '../navigations/DropdownComponent';
import CalendarComponent from '../navigations/CalendarComponent';
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
      surveyId: this.props.navigation.getParam('surveyId', null),
      currentUser: firebase.auth().currentUser,
      questionNumber: 0,
      numQuestions: 0,
      progressBar: 0,
      questions: [],
      answers: {},
      programId: this.props.navigation.getParam('programId', null),
      date: 0,
      fieldValidity: {}
    };

    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.responseType = this.responseType.bind(this);
    this.makeOnSetValue = this.makeOnSetValue.bind(this);
    this.fetchSurveyData = this.fetchSurveyData.bind(this);
    this.handleSurveyData = this.handleSurveyData.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.state.surveyId !== null) {
      this.fetchSurveyData(this.state.surveyId);
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
      progressBar: 1 / resultQuestions.length,
      answers: {},
    })
  }

  makeOnSetValue(index) {
    const fieldName = 'field' + index;
    return (value) => {
      console.log('value', value)
      this.setState(prevState => ({
        answers: {...prevState.answers, [fieldName]: value}
      }))
    }
  }

  next() {
    // console.log('this.state.answers',this.state.answers)
    const { questions, questionNumber, numQuestions,answers } = this.state
    if (answers['field'+questionNumber] === '' && questions[questionNumber].mandatory === 'true') {
      const fieldName = 'field' + questionNumber;
      return this.setState(prevState => ({
        fieldValidity: {...prevState.fieldValidity, [fieldName]: value}
      }));
    }
    if (questionNumber + 2 <= numQuestions) {
      this.setState({
        questionNumber: questionNumber + 1,
        progressBar: (questionNumber + 2) / numQuestions
      });
    }
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

  insert(arr, index, newItem) {return [
    // part of the array before the specified index
    ...arr.slice(0, index),
    // inserted item
    newItem,
    // part of the array after the specified index
    ...arr.slice(index)
  ]}

  responseType(questionIndex) {

    if (this.state.questions[questionIndex].type == "text") {
      return <TextComponent value={this.state.answers['field'+questionIndex] || ''} onSetValue={this.makeOnSetValue(questionIndex)} validity={this.state.fieldValidity['field'+questionIndex]||true} />
    } else if (this.state.questions[questionIndex].type == "radio") {
      return <DropdownComponent value={this.state.answers['field'+questionIndex] || ''} onSetValue={this.makeOnSetValue(questionIndex)} options={this.insert(this.state.questions[questionIndex].options,0,'')} validity={this.state.fieldValidity['field'+questionIndex]||true} />
    } else if (this.state.questions[questionIndex].type == "date") {
      return <CalendarComponent value={this.state.answers['field'+questionIndex] || ''} onSetValue={this.makeOnSetValue(questionIndex)} validity={this.state.fieldValidity['field'+questionIndex]||true} />
    } else {
      // change this
      return <TextComponent value={this.state.answers['field'+questionIndex] || ''} onSetValue={this.makeOnSetValue(questionIndex)} validity={this.state.fieldValidity['field'+questionIndex]||true} />
    }

  }

  onSubmit() {
    console.log('this.state.currentUser', this.state.currentUser);
    const {answers,currentUser,programId, surveyId} = this.state;
    let dataToSend = {...answers, user: currentUser.email, programId, surveyId};
    firebase.database().ref('responses/').push(dataToSend).then((data)=>{
        //success callback
        console.log('data ' , data);
        this.props.navigation.navigate('Tab', {surveyFinish: true})
    }).catch((error)=>{
        //error callback
        console.log('error ' , error)
    })
    // console.log('dataToSend', dataToSend)
  }

  render() {
    const { currentUser, loading, progressBar, questionNumber, questions, numQuestions } = this.state;
    if (loading) {
      return <ActivityIndicator />
    } else {
      return (
          <Quiz isLastPage={questionNumber +2 > numQuestions} progress={progressBar} questionNumber={questionNumber} questionText={questions[questionNumber].text} onNext={this.next} onPrevious={this.previous} onSubmit={this.onSubmit}>

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

