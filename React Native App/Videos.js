import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-native-modal';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Button,
  StyleSheet,
  Alert,
  Animated,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import Sports from '../components/Sports4';

const initialData = require('../Urdu.json');

const Cricket = () => {
  
  const [visibleItemCount, setVisibleItemCount] = useState(10); // Initially load 10 items

 

  const videos = [
    { id: 1, title: 'First look at McDonalds new restaurant CosM', url: 'https://www.bbc.com/news/av/world-us-canada-67656294', thumbnail: 'https://media.npr.org/assets/img/2023/12/07/cosmcs-mcdonalds-illinois-d6ece4dc6215ffffbca816dff2da1cfdcbab92a7-s1100-c50.jpg' },
    { id: 2, title: 'See beyond rare white baby alligator born in US', url: 'https://www.bbc.com/news/av/world-us-canada-67667226', thumbnail: 'https://th-thumbnailer.cdn-si-edu.com/JAJRPKa9Fefp1il7gOcIaUezyfQ=/1000x750/filters:no_upscale():focal(1440x960:1441x961)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer_public/53/43/5343a46c-66e4-4f8e-8f6e-ab731ad69793/leucistic_2.jpg' },
    { id: 3, title: 'Heckling and choking up: Boris Johnson grilled at Covid inquiry', url: 'https://www.bbc.com/news/av/uk-politics-67642892', thumbnail: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/12AE7/production/_131591567_borisjohnsonreuters.jpg' },
    { id: 4, title: 'World War Two shell is detonated on beach in Norfolk', url: 'https://www.bbc.com/news/av/uk-england-norfolk-67658072' , thumbnail: 'https://kubrick.htvapps.com/htv-prod-media.s3.amazonaws.com/images/ww2artilleryshell-64a738b2bd9af.jpg?crop=0.976xw:0.898xh;0,0&resize=640:*'},
    { id: 5, title: 'Japan: Thousands of dead fish mysteriously wash up on beach', url: 'https://www.bbc.com/news/av/world-asia-67663107' , thumbnail: 'https://e3.365dm.com/23/12/768x432/skynews-dead-fish-japan_6386571.jpg?20231208134751'},
    // Add more video data as needed
  ];

  const renderListItem = ({ item }) => (
    <View style={styles.listItemContainer}>
        <Text style={styles.documenttitle}>{item.title}</Text>
        <Image source={{ uri: item.thumbnail }} style={styles.image2} />
      <Text style={styles.videoTitle} onPress={() => openVideoUrl(item.url)}>
        Tap here to watch video
      </Text>
    </View>
    );

    const openVideoUrl = (url) => {
    Linking.openURL(url);
    };
  
  

  const loadMoreItems = () => {
    setVisibleItemCount((prevCount) => prevCount + 5);
  };

  return (
    <View style={styles.container}>
      <Image source={require('./logo.png')} style={styles.image} />
      <Text style={styles.top}>Videos Archives</Text>
      <FlatList style={styles.carousel}
        data={videos.slice(0, visibleItemCount)}
        renderItem={renderListItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.loading}>No Articles Found</Text>}
      />

      {visibleItemCount < videos.length && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={loadMoreItems} style={styles.frequencyButton}>
            <Text style={styles.frequencyButtonText}>Load More</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    videoTitle: {
    fontSize: 19,
    color: 'blue',
    textAlign: 'right',
    lineHeight: 18,
    textAlign: 'justify',
    marginTop: 4,
    marginBottom: 16,
    },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FBFBFB',
  
    
  },
  carousel: {
    height: 200,
    borderRadius: 20,
    marginLeft: -10,
    marginTop: -295,
    borderRadius: 20,
    // Additional styles for the ImageCarousel container
  },
  top: {
    fontSize: 31,
    fontWeight: 'bold',
    color: '#BB1919',
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 330,
    fontFamily: 'sans-serif',
    fontStyle: 'italic',
  },
  buttons: {
    width: 85,
    height: 35,
    backgroundColor: 'purple',
    borderRadius: 100,
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 5,
  },

  fullbuttons: {
    width: 125,
    height: 35,
    backgroundColor: '#E4E5E7',
    borderRadius: 100,
    alignItems: 'center',
    alignContent: 'center',
    marginTop: -18,
  },
  image: {
    width: 460,
    height: 65,
    marginTop: -10,
    marginLeft: -40,
    marginBottom: 0,

    resizeMode: 'contain',
    backgroundColor: '#BB1919',
  },

    image2: {
    width: 620,
    height: 145,
    marginTop: -5,
    marginLeft: -185,
    marginBottom: 10,
    resizeMode: 'contain',

    },
  fullDocumentContainer: {
    height: '400',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderWidth: 1,
    borderColor: 'purple',
    borderRadius: 10,
  },

  spinnerTextStyle: {
    color: 'black',
  },

  buttonText: {
    color: 'white',
    alignItems: 'center',
    alignContent: 'center',
    fontSize: 13,
    paddingTop: 9,

    marginBottom: 5,
  },
  search: {
    width: 40,
    resizeMode: 'contain',
    height: 40,
    borderRadius: 10,
    marginLeft: 320,
    marginTop: 68,
  },
  Image: {
    width: 210,
    resizeMode: 'contain',
    height: 210,
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 10,
  },
  Image2: {
    width: 150,
    height: 120,
    borderRadius: 30,
    resizeMode: 'contain',
    marginTop: -50,
    marginLeft: 190,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  searchIconContainer: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 1,
  },
  detbuttonText: {
    color: '#1e90ff',
    alignItems: 'center',
    alignContent: 'center',
    fontSize: 15,
    width: 125,
    justifyContent: 'center',
    alignContent: 'center',
    marginLeft: 200,
    marginTop: 6,
    marginBottom: 5,
  },
  hiddenText: {
    marginTop: 12,
    fontSize: 17,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'green',
  },

  score: {
    fontSize: 16,
    marginTop: -62,
    color: 'green',
    fontWeight: 'bold',
    marginBottom: 10,
  },

  score2: {
    fontSize: 16,
    marginTop: -14,
    color: 'steelblue',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  heading: {
    fontSize: 20,
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  heading2: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    color: 'blue',
  },

  input: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'purple',
    textAlignVertical: 'top',
    color: '#333',
    paddingLeft: 10,
    marginTop: 10,
    backgroundColor: '#fff',
  },

  customAlertContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  customAlertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  customAlertMessage: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  input2: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'purple',
    textAlignVertical: 'top',
    color: '#333',
    paddingLeft: 10,
    marginTop: 10,
    backgroundColor: '#fff',
  },

  documenttitle: {
    fontSize: 23,
    color: '#BB1919',
    fontWeight: 'bold',
    marginTop: 4,
    marginBottom: 10,
  },
  detailtitle: {
    fontSize: 25,
    color: '#BB1919',
    marginTop: 20,
    textAlign: 'justify',
    fontWeight: 'bold',
    marginBottom: 10,
  },

  buttonContainer: {
    marginTop: 10,
    marginBottom: 10,
  },

  frequencyButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#BB1919',
    alignItems: 'center',
  },
  frequencyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  listItemContainer: {
    padding: 15,
    borderRadius: 20,
    backgroundColor: '#E4E5E7',
    marginBottom: 10,
    elevation: 5,
    shadowRadius: 10,
    shadowColor: 'black',
    borderColor: 'salmon',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    zIndex: 1,
  },
  loading: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 28,
    backgroundColor: 'white',
    padding: 10,
    fontWeight: 'bold',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#BB1919',
    color: '#555',
  },
  content: {
    fontSize: 16,
    color: '#333',
    textAlign: 'right',
    lineHeight: 18,
    textAlign: 'justify',
    marginTop: -4,
    
    marginBottom: 16,
  },
  detcontent: {
    fontSize: 16,
    marginTop: 16,
    color: 'black',
    textAlign: 'justify',
    lineHeight: 18,
   
    marginBottom: 16,
  },
  Button2: {
    borderRadius: 10,
    backgroundColor: 'red',
    marginTop: -40,
    elevation: 2,
    width: 60,
    marginLeft: 270,
    paddingBottom: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
  },

 

  Date: {
    fontSize: 17,
    color: 'purple',
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 1,
  },
  Category: {
    fontSize: 17,
    color: '#5f9ea0',
    fontWeight: 'bold',
    marginTop: -6,
    marginBottom: -10,
  },
  slideContainer: {
    marginTop: 10,
    borderRadius: 10,
    height: 200,
  },

  modalContainer: {
    marginTop: 50,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },

  frequency: {
    fontSize: 16,
    color: 'steelblue',
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Cricket;