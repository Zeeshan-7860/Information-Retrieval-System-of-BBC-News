// YourMainComponent.js
import React from 'react';
import { View } from 'react-native';
import Carousel from './Carousel';
import { StyleSheet } from 'react-native';

const MainComponent = () => {
  const images = [
    "https://dailypakistan.com.pk/digital_images/large/2023-12-09/news-1702138173-7522.jpg",
    "https://dailypakistan.com.pk/digital_images/large/2023-12-09/news-1702122845-2980.jpg",
    "https://ichef.bbci.co.uk/news/800/cpsprodpb/b3fa/live/b4082f20-85c9-11ee-913e-f1ed4de8fadb.jpg",
    "https://dailypakistan.com.pk/digital_images/large/2023-12-09/news-1702129426-7570.jpg",
    "https://dailypakistan.com.pk/digital_images/large/2023-12-09/news-1702124311-5485.jpg",
    

  ];
  const texts = [
    "عمران خان کے خلاف 190 ملین پاؤنڈز ریفرنس میں گواہان کے نام سامنے آگئے",
    "کرسمس پرمسیحی ملازمین کیلیے خوشخبری ،پنجاب حکومت نےتنخواہوں کی ادائیگی کیلیے اہم ہدایات جاری کر دیں",
    "غزہ پر حملے کی وجہ سے کیا عرب ممالک پہلے کی طرح مغرب کو تیل فروخت کرنا بند کریں گے؟",
    "بیرسٹر گوہر خان کا الیکشن کمیشن سے بلا تاخیر پارٹی سرٹیفکیٹ شائع کرنے کا مطالبہ",
    "پہلے مار دھاڑ کرتا رہا اس پر بھی چین نہ آیا تو پھر شوہر نے بیوی کا گلا ہی دبا دیا",
   
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
