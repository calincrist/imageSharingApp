import React from 'react';
import { List, ListItem, Text, Icon, Button, Container, Content } from 'native-base';
import { Image, Dimensions, View, Share, ActivityIndicator, StyleSheet } from 'react-native';
import Analytics from '../services/analytics';

var {height, width} = Dimensions.get('window');

const Gallery = ({ imageList, loading }) => {
  const share = async (image) => {
    const result = await Share.share({message: image.src, title: 'Image from: ' + image.user.name});
    
    if (result.action === Share.sharedAction) {
      Analytics.logEvent("share", {
        type: result.activityType
      });
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  }

  return (
    <View style={{flex: 1}}>
      <List style={{margin: 0}}>
        {
          imageList && imageList.map((image) => {
            return (
              <ListItem key={image.id} style={{borderBottomWidth: 0, flexDirection: 'column', marginBottom: -20}}>
                <View style={styles.user}>
                  <Image source={{uri: image.user.pic}} style={styles.userPic}/>
                  <Text style={{fontWeight: 'bold'}}>{image.user.name}</Text>
                </View>
                <Image source={{uri: image.src}} style={styles.image}/>
                <Button style={{position: 'absolute', right: 15, top: 25}} transparent onPress={() => share(image)}>
                  <Icon name='ios-more' style={{fontSize: 20, color: 'black'}}/>
                </Button>
              </ListItem>
            );
          })
        }
      </List>
      {
        loading &&
        <View style={styles.spinnerContainer}>
          <ActivityIndicator/>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  user: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    padding: 10
  },
  userPic: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    marginRight: 10,
    borderRadius: 25
  },
  image: {
    width: width,
    height: 300,
    resizeMode: 'cover'
  },
  spinnerContainer: {
    justifyContent: 'center',
    height: (height - 50)
  }
});

export default Gallery;
