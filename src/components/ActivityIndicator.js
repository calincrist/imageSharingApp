import React from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';

export default ({ message }) => {
  
  return (
    <View style={styles.container}>
      <ActivityIndicator style={{marginRight: 10}}/>
      <Text>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0'
  }
});