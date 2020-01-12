import React, { useEffect } from 'react';
import { Image, TouchableOpacity, Text, View, ActivityIndicator, Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../actions';
import { useNavigation } from 'react-navigation-hooks';

import Header from '../components/Header';
import ImagesGrid from '../components/ImagesGrid';

var {height, width} = Dimensions.get('window');

const MyImages = ({
  fetchImages,
  fetchingImages,
  user,
  images
}) => {

  const {navigate} = useNavigation();

  useEffect(() => {
    fetchImages(user.name);
  }, []);

  return (
    <View>
      <Header 
        onMenuButtonPress={() => navigate('DrawerOpen')} 
        onCameraButtonPress={() => navigate('Camera')}
      />
      {
        fetchingImages &&
        <View style={{justifyContent: 'center', height: (height - 50)}}>
          <ActivityIndicator/>
        </View>
      }
      <ImagesGrid images={images}/>
    </View>
  );
}

function mapStateToProps(state) { return { images: state.imagesReducer.userImages, user: state.imagesReducer.user, fetchingImages: state.imagesReducer.fetchingUserImages } }
function mapStateActionsToProps(dispatch) { return bindActionCreators(Actions, dispatch) }

export default connect(mapStateToProps, mapStateActionsToProps)(MyImages);