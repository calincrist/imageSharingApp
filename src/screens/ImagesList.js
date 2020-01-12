/*** src/components/ImagesList ***/

import React, { useEffect } from 'react';
import { View, ScrollView } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';

import Header from '../components/Header';
import Gallery from '../components/Gallery';
import ActivityIndicator from '../components/ActivityIndicator';

const ImagesList = ({
  fetchImages,
  addingImage,
  images,
  fetchingImages
}) => {

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if(!addingImage) {
      this.scrollable.scrollTo({y: 0});
    }
  }, [addingImage])

  
  return (
    <View style={{flex: 1}}>
      <Header 
      onMenuButtonPress={() => this.props.navigation.navigate('DrawerOpen')}
      onCameraButtonPress={() => this.props.navigation.navigate('Camera')}/>
        <ScrollView ref={(scrollable) => {
          this.scrollable = scrollable;
        }}>
        { addingImage && <ActivityIndicator message='Adding image' /> }
        <Gallery imageList={images} loading={fetchingImages}/>
      </ScrollView>
    </View>
  );
  
}

function mapStateToProps(state) { return { images: state.imagesReducer.images, addingImage: state.imagesReducer.addingImage, fetchingImages: state.imagesReducer.fetchingImages } }
function mapStateActionsToProps(dispatch) { return bindActionCreators(Actions, dispatch) }

export default connect(mapStateToProps, mapStateActionsToProps)(ImagesList);