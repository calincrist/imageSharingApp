import React from 'react';
import { View, Image, StyleSheet, SafeAreaView } from 'react-native';
import { Icon, Button } from 'native-base';
import { Platform } from 'react-native';

const Header = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../../img/logo.png')} style={styles.logo} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  menuIcon: {
    fontSize: 30,
    color: 'black'
  },
  logo: {
    height: 25,
    resizeMode: 'contain',
    margin: 10
  },
  cameraIcon: {
    fontSize: 30,
    color: 'black'
  }
});

export default Header;
