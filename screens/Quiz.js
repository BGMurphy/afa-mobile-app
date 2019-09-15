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
  Text,
  Icon
} from 'native-base';
import { StyleSheet, ImageBackground, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import * as Progress from 'react-native-progress';
import styled from 'styled-components';
import Dimensions from 'Dimensions';
import firebase from 'firebase';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

const Color = ['#0818A8', '#024FA8', '#2E96C7'];

const ProgressBarWrapper = styled.View`
  position: absolute;
  top: 5%;
  width: 100%;
  height: 5%;
`;

const QuestionWrapper = styled.View`
  position: absolute;
  top: 10%;
  width: 90%;
  height: 30%;
  margin-bottom: 5%;
`;

const Question = styled.Text`
  padding-left: 15px;
  font-size: 20px;
  color: #fff;
  margin-bottom: 5%;
`;

const ContentWrapper = styled.View`
  top: -15%;
  width: 85%;
  height: 50%;
  justify-content: center;
  margin: 0 auto;
  z-index: 100;
`;

const ButtonWrapper = styled.View`
  position: absolute;
  right: 0;
  bottom: 0;
`;

export default class Quiz extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    const images = firebase.storage().ref();
    const login_background = images.child('bg2.jpg');
    let promises = [];
    promises.push(login_background.getDownloadURL());
    Promise.all(promises).then(images => {
      this.setState({
        login_background: images[0],
        loading: false
      });
    });
  }

  render() {
    const {
      children,
      progress,
      questionText,
      onNext,
      questionNumber,
      onPrevious,
      isLastPage,
      onSubmit
    } = this.props;

    return (
      <React.Fragment>
        <ProgressBarWrapper style={{ justifyContent: 'center' }}>
          <Progress.Bar progress={progress} width={width} />
        </ProgressBarWrapper>

        <View
          style={{
            top: '10%',
            flex: 1,
            flexDiection: 'column'
          }}
        >
          <ImageBackground
            // source={require('../assets/bg2.jpg')}
            source={{ uri: this.state.login_background }}
            style={{ flex: 1 }}
          >
            <LinearGradient colors={Color} style={styles.gradient}>
              <QuestionWrapper
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: 15,
                  textAlign: 'center',
                  flexWrap: 'wrap'
                }}
              >
                <View style={styles.circle}>
                  <Text style={{ fontSize: 25, color: '#0818A8' }}>
                    {questionNumber + 1}
                  </Text>
                </View>
                <Question style={{ textAlign: 'center', flexWrap: 'wrap' }}>
                  {questionText}
                </Question>
              </QuestionWrapper>
            </LinearGradient>
          </ImageBackground>
        </View>
        <ContentWrapper
          style={{
            backgroundColor: '#fff',
            borderWidth: 0.5,
            borderColor: '#d6d7da',
            borderRadius: 20
          }}
        >
          {children}
        </ContentWrapper>
        <ButtonWrapper>
          <Button
            onPress={onPrevious}
            rounded
            iconRight
            light
            style={{
              marginRight: width * 0.565,
              marginBottom: 15,
              backgroundColor: '#0818A8'
            }}
          >
            <Icon
              name="arrow-back"
              style={{ paddingLeft: 10, color: '#fff' }}
            />
            <Text>Previous</Text>
          </Button>
        </ButtonWrapper>
        <ButtonWrapper>
          <Button
            onPress={isLastPage ? onSubmit : onNext}
            rounded
            iconRight
            light
            style={{
              marginRight: 20,
              marginBottom: 15,
              backgroundColor: '#0818A8'
            }}
          >
            <Text>{isLastPage ? 'Finish' : 'Next'}</Text>
            <Icon name="arrow-forward" style={{ color: '#fff' }} />
          </Button>
        </ButtonWrapper>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  circle: {
    width: 40,
    height: 40,
    borderRadius: 100 / 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    top: 10
  },
  gradient: {
    opacity: 0.8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
