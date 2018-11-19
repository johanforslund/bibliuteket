import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/MaterialIcons';
import BookListScreen from './screens/BookListScreen';
import AddBookScreen from './screens/AddBookScreen';
import ProfileScreen from './screens/ProfileScreen';

const BookListStack = createStackNavigator({
  BookList: {
    screen: BookListScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#29749D'
      }
    }
  }
});

BookListStack.navigationOptions = {
  tabBarLabel: 'Hem'
};

const AddBookStack = createStackNavigator({
  AddBook: {
    screen: AddBookScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#29749D'
      }
    }
  }
});

AddBookStack.navigationOptions = {
  tabBarLabel: 'Lägg ut bok',
};

const ProfileStack = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#29749D'
      }
    }
  }
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Konto',
};

const TabNavigator = createBottomTabNavigator(
  {
    BookList: BookListStack,
    AddBook: AddBookStack,
    Profile: ProfileStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'BookList') {
          iconName = `home${focused ? '' : ''}`;
        } else if (routeName === 'AddBook') {
          iconName = `add${focused ? '' : ''}`;
        } else if (routeName === 'Profile') {
          iconName = `person${focused ? '' : ''}`;
        }

        return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#f9fafa',
      activeBackgroundColor: '#29749D',
      inactiveTintColor: '#94bace',
      inactiveBackgroundColor: '#29749D'
    }
  }
);

const AppContainer = createAppContainer(TabNavigator);

export default AppContainer;
