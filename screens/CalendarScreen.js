import React from 'react';
import { View } from 'native-base';
import { StyleSheet, Text } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import firebase from 'firebase';

export default class CalendarScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    const programId = navigation.getParam('programId', 'noProgramId');
    return (
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 20,
            marginBottom: 15,
            marginRight: 15,
            marginLeft: 15
          }}
        >
          Please select the date of the session you attended.
        </Text>
        <Calendar
          onDayPress={day => {
            this.props.navigation.navigate('Survey', {
              surveyId: 'test1',
              programId: 'programId'
            });
          }}
          markedDates={{
            '2019-09-15': {
              selected: true,
              selectedColor: '#2E96C7'
            },
            '2019-09-20': {
              selected: true,
              selectedColor: '#2E96C7'
            },
            '2019-09-25': {
              selected: true,
              selectedColor: '#2E96C7'
            },
            '2019-09-10': {
              selected: true,
              selectedColor: '#2E96C7'
            }
          }}
          style={{
            borderWidth: 0.5,
            borderColor: '#d6d7da',
            borderRadius: 10
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
