// YourMainComponent.js
import React from 'react';
import { View } from 'react-native';
import Carousel from './Carousel';
import { StyleSheet } from 'react-native';

const YourMainComponent = () => {
  const images = [
    "https://i.tribune.com.pk/media/images/IMF1650816544-0/IMF1650816544-0.jpg",
    "https://c.ndtvimg.com/2019-07/tvnofip8_nawaz-sharif-reuters_625x300_07_July_19.jpg",
    "https://www.aljazeera.com/wp-content/uploads/2023/12/khan-1701531555.jpeg?resize=770%2C513&quality=80",
    "https://www.geosuper.tv/assets/uploads/updates/2023-12-08/30847_3227337_updates.jpg",
    "https://media.wired.com/photos/6570fa9c24772bae860336a9/master/w_1600,c_limit/bard-biz-gemini_mm_03.jpg",

  ];
  const texts = [
    "IMF board to okay Pakistan SLA on Jan 11",
    "Nawaz Sharif Says Party Doesn't Seek Power, Rather Demands Accountability",
    "Jailed ex-Pakistan PM Imran Khan’s party elects new head before election",
    "Hafeez contacts Wahab for injured Abrar Ahmed's replacement: sources",
    "Google’s Gemini Is the Real Start of the Generative AI Boom",
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
    borderRadius: 20,
    // Additional styles for the main container
  },
  carousel: {
    height: 200,
    borderRadius: 20,
    width: '100%',
    // Additional styles for the ImageCarousel container
  },
});
export default YourMainComponent;
