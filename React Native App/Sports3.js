// YourMainComponent.js
import React from 'react';
import { View } from 'react-native';
import Carousel from './Carousel';
import { StyleSheet } from 'react-native';

const MainComponent = () => {
  const images = [
    "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_400/lsci/db/PICTURES/CMS/372300/372346.6.jpg",
    "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_1040/lsci/db/PICTURES/CMS/372300/372377.6.jpg",
    "https://c.ndtvimg.com/2023-10/0rr1a37o_suryakumar-yadav-afp_625x300_13_October_23.jpg?im=FeatureCrop,algorithm=dnn,width=210,height=158&output-quality=80",
    "https://www.cricbuzz.com/a/img/v1/205x152/i1/c365032/sutherland-earned-a-bid-of-inr.jpg",
    "https://www.cricbuzz.com/a/img/v1/205x152/i1/c15501/salman-butt-had-been-appointed.jpg",

  ];
  const texts = [
    "Freak Canberra storm ends Pakistan Test build-up early",
    "Former West Indies offspinner and selection chief Clyde Butts dies at 66",
    "World Cup Defeat Was A Disappointment And It Is Tough To Move On",
    "It is a big compliment to be in demand: Annabel Sutherland",
    "Salman Butt removed 24 hours after appointment as consultant",
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
