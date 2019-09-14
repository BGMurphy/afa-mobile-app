import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/Home';
import LoadingScreen from '../screens/Loading';
import SettingsScreen from '../screens/SettingsScreen';
import SurveyScreen from '../screens/Survey';
import CalendarScreen from '../screens/CalendarScreen';
import SignUpScreen from '../screens/SignUp';
import TabBarIcon from '../components/TabBarIcon';
import QuizScreen from '../screens/Quiz';

// look up
// https://reactnavigation.org/docs/en/stack-navigator.html#routeconfigs

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  )
};

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  )
};

const TabNavigator = createBottomTabNavigator({
  HomeStack,
  SettingsStack
});

const SurveyStack = createStackNavigator(
  {
    Survey: {
      screen: SurveyScreen,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

const AppStack = createStackNavigator(
  {
    Tab: {
      screen: TabNavigator
    },
    Survey: {
      screen: SurveyStack
    },
    Calendar: {
      screen: CalendarScreen
    }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);
// const AppStack = createStackNavigator({ Home: HomeScreen });
const AuthStack = createStackNavigator(
  {
    Signup: {
      screen: SignUpScreen
    }
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

const MainNavigator = createAppContainer(
  createSwitchNavigator(
    {
      Loading: { screen: LoadingScreen },
      Auth: AuthStack,
      App: AppStack
    },
    {
      initialRouteName: 'Loading'
    }
  )
);

export default MainNavigator;