// ImageCarousel.js
import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

const ImageCarousel = ({ images, texts }) => {
  return (
    <Swiper
      style={styles.wrapper}
      showsButtons={false}
      autoplay={true}
      autoplayTimeout={4} 
      activeDotColor="#BB1919"
      dotColor="black"
    >
      {images.map((imagePath, index) => (
        <View key={index} style={styles.slide}>
          <Image source={{ uri: imagePath }} style={styles.image} />
          {texts && texts[index] && (
            <Text style={styles.text}>{texts[index]}</Text>
          )}
        </View>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    width: 400,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    resizeMode: 'contain',
    
  },
  text: {
    color: 'black',
    fontSize: 20,
    alignContent: 'center',
    justifyContent: 'center',
    padding: 30,
    marginTop: -15,
    fontWeight: 'bold',
  },
});

export default ImageCarousel;
