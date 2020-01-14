/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Icon } from 'native-base';
import imagesReducer from './src/reducers/images';

import ImagesList from './src/screens/ImagesList';
import MyImages from './src/screens/MyImages';
import Camera from './src/screens/Camera';
import Login from './src/screens/Login';

import Analytics from './src/services/analytics';

const Navigator = createBottomTabNavigator({
  ImagesList: { screen: ImagesList },
  MyImages: { screen: MyImages },
  Camera: { screen: Camera },
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      
      if (routeName === 'ImagesList') {
        return <Icon name='list' style={{fontSize: 40, color: tintColor}}/>;
      } else if (routeName === 'MyImages') {
        return <Icon name='person' style={{fontSize: 40, color: tintColor}}/>;
      } else if (routeName === 'Camera') {
        return <Icon name='camera' style={{fontSize: 40, color: tintColor}}/>;
      }
    },
  }),
  tabBarOptions: {
    inactiveTintColor: '#aaa',
    activeTintColor: '#000',
    showLabel: 	false
  }
});

const SwitchNavigator = createSwitchNavigator(
  {
    SignedIn: {
      screen: Navigator,
    },
    SignedOut: {
      screen: Login,
    },
  },
  {
    initialRouteName: 'SignedOut',
  },
);

let store = createStore(combineReducers({ imagesReducer }), applyMiddleware(thunk));

const AppContainer = createAppContainer(SwitchNavigator);

const App = () => {
  const getActiveRouteName = navigationState => {
    if (!navigationState) {
      return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
      return getActiveRouteName(route);
    }
    return route.routeName;
  };

  return (
    <Provider store={store}>
      <AppContainer
        onNavigationStateChange={(prevState, currentState, action) => {
          const currentRouteName = getActiveRouteName(currentState);
          const previousRouteName = getActiveRouteName(prevState);

          if (previousRouteName !== currentRouteName) {
            Analytics.setCurrentScreen(currentRouteName);
          }
        }}
      />
    </Provider>
  )
}

export default App;
