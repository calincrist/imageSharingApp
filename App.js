/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Icon } from 'native-base';
import imagesReducer from './src/reducers/images';

import ImagesList from './src/screens/ImagesList.js';
import MyImages from './src/screens/MyImages.js';
import Camera from './src/screens/Camera.js';

let Navigator;
// if(Platform.OS === 'ios'){
  Navigator = createBottomTabNavigator({
    ImagesList: { screen: ImagesList },
    MyImages: { screen: MyImages },
    Camera: { screen: Camera }
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
// } else {
  // Navigator = createDrawerNavigator({
  //   ImagesList: { screen: ImagesList },
  //   MyImages: { screen: MyImages },
  //   Camera: { screen: Camera }
  // });
// }

let store = createStore(combineReducers({ imagesReducer }), applyMiddleware(thunk));

const AppContainer = createAppContainer(Navigator);

export default class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    )
  }
}
