// YourMainComponent.js
import React from 'react';
import { View } from 'react-native';
import Carousel from './Carousel';
import { StyleSheet } from 'react-native';

const MainComponent = () => {
  const images = [
    "https://media.cnn.com/api/v1/images/stellar/prod/5c3e9fa0-b076-4ded-9517-60a485623fd3.jpg?c=16x9&q=h_720,w_1280,c_fill",
    "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-1833200396.jpg?c=16x9&q=h_720,w_1280,c_fill",
    "https://media.cnn.com/api/v1/images/stellar/prod/231209054333-01-chris-evert.jpg?c=16x9&q=h_653,w_1160,c_fill/f_webp",
    "https://www.aljazeera.com/wp-content/uploads/2023/12/2023-12-09T052642Z_441888616_RC2FT4ALNR5D_RTRMADP_3_ISRAEL-PALESTINIANS-1702110412.jpg?resize=770%2C513&quality=80",
    "https://media.cnn.com/api/v1/images/stellar/prod/shutterstock-editorial-13721297g-1.jpg?c=16x9&q=h_438,w_780,c_fill",

  ];
  const texts = [
    "Israel-Hamas war: US vetoes UN resolution calling for Gaza ceasefire",
    "Harvard president apologizes for her disastrous testimony at antisemitism hearing: ‘Words matter’",
    "Tennis great Chris Evert re-diagnosed with cancer",
    "‘Double standards’: World reacts to US veto on Gaza truce resolution at UN",
    "What is COP28? The UN climate summit, explained",
  ];
  return (
    <View style={styles.container}>
      <Carousel images={images} texts={texts} containerStyle={styles.carousel} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 270,
    marginTop : -295,
    marginLeft : -15,
    borderRadius: 20,
    borderRadius: 20,
    // Additional styles for the main container
  },
  carousel: {
    height: 200,
    borderRadius: 20,
    width: '100%',
    elevation: 5,
    // Additional styles for the ImageCarousel container
  },
});
export default MainComponent;
