import React, { Component, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';
import { Input, Container, Item } from 'native-base';

import Analytics from '../services/analytics';
import { useNavigation } from 'react-navigation-hooks';

const Login = () => {

  const { navigate } = useNavigation();

  const [email, setEmail] = useState('a@b.com');
  const [password, setPassword] = useState('')

  const loginAction = async () => {

    //  validate inputs...
    //  api call for signing in...

    navigate('SignedIn');
    await Analytics.onSignIn({ id: "1", email })
  }

  
  return (
    <Container style={styles.container}>
  
      <Image source={require('../../img/logo.png')} style={styles.logo} />
      <Item style={styles.inputContainer} underline>
        <Input 
          value={email}
          
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={(email) => setEmail(email)}/>
      </Item>
      
      <Item style={styles.inputContainer}>
        <Input 
          value={password}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}/>
      </Item>

      <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={loginAction}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableHighlight>
      
    </Container>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    width:250,
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center'
  },
  logo: {
    resizeMode: 'contain',
    margin: 10
  },
  inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
});

export default Login;