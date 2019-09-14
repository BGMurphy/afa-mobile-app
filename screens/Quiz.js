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
import styled from 'styled-components';

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
  width: 100%;
  height: 30%;
`;

const Question = styled.Text`
  padding-left: 15px;
  font-size: 20px;
  text-align: center;
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
  render() {
    return (
      <React.Fragment>
        <ProgressBarWrapper
          style={{ backgroundColor: '#EAA5BA', justifyContent: 'center' }}
        >
          <Text>
            Here is Progress Bar Wrapper, Here is Progress Bar Wrapper
          </Text>
        </ProgressBarWrapper>

        <View
          style={{
            top: '10%',
            flex: 1,
            flexDiection: 'column',
            backgroundColor: 'lightblue'
          }}
        >
          <QuestionWrapper
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 15
            }}
          >
            <View style={styles.circle}>
              <Text style={{ fontSize: 25 }}>1</Text>
            </View>
            <Question>Here is a Question</Question>
          </QuestionWrapper>
        </View>
        <ContentWrapper
          style={{
            backgroundColor: 'lavender',
            borderWidth: 0.5,
            borderColor: '#d6d7da',
            borderRadius: 10
          }}
        >
          {/* <Calendar
            onDayPress={day => {
              console.log('selected day', day);
            }}
            markedDates={{
              '2019-09-15': {
                selected: true,
                selectedColor: '#2E96C7'
              }
            }}
            style={{
              borderWidth: 0.5,
              borderColor: '#d6d7da',
              borderRadius: 10
            }}
          /> */}
        </ContentWrapper>
        <ButtonWrapper>
          <Button
            rounded
            iconRight
            light
            style={{ marginRight: 20, marginBottom: 15 }}
          >
            <Text>Next</Text>
            <Icon name="arrow-forward" />
          </Button>
        </ButtonWrapper>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  circle: {
    width: 80,
    height: 80,
    borderRadius: 100 / 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    top: 10
  }
});
