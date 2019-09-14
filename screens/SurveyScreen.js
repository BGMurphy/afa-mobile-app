import React from 'react';
import { View } from 'native-base';
import { StyleSheet, Text} from 'react-native';
import firebase from 'firebase';

export default class SettingsScreen extends React.Component {

  render() {
    const {navigation} = this.props;
    const programId = navigation.getParam('programId', 'noProgramId');
    return (
      <View style={styles.container}>
        <Text>Program Id: {programId}</Text>
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
