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
} from 'react-native';
import Sports from '../components/Sports4';

const initialData = require('../Urdu.json');

const Cricket = () => {
  const [isFullDocumentVisible, setFullDocumentVisible] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [visibleItemCount, setVisibleItemCount] = useState(10); // Initially load 10 items

  const showFullDocument = (document) => {
    setSelectedDocument(document);
    setFullDocumentVisible(true);
  };

  const hideFullDocument = () => {
    setFullDocumentVisible(false);
  };

  const renderFullDocument = () => {
    if (!selectedDocument) {
      return null;
    }

    return (
      <Modal
        visible={isFullDocumentVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={hideFullDocument}>
        <ScrollView>
          <View style={styles.fullDocumentContainer}>
            <Text style={styles.detailtitle}>{selectedDocument.B}</Text>
            <Text style={styles.Date}>{selectedDocument.H}</Text>
            <Text style={styles.detcontent}>{selectedDocument.C}</Text>
            <Button title="Close" onPress={hideFullDocument} />
          </View>
        </ScrollView>
      </Modal>
    );
  };

  const renderListItem = ({ item }) => (
    <View style={styles.listItemContainer}>
      <Text style={styles.Date}>{item.H}</Text>
      <Text style={styles.Category}>{item.D}</Text>
      <Text style={styles.documenttitle}>{item.B}</Text>
      <Text style={styles.content}>{item.C.slice(0, 120)} ........</Text>
      <TouchableOpacity
        onPress={() => showFullDocument(item)}
        style={styles.fullbuttons}>
        <Text style={styles.detbuttonText}>Read Full Document</Text>
      </TouchableOpacity>
    </View>
  );

  const loadMoreItems = () => {
    setVisibleItemCount((prevCount) => prevCount + 5);
  };

  return (
    <View style={styles.container}>
      <Image source={require('./logo.png')} style={styles.image} />
      <Text style={styles.top}>Urdu Articles</Text>
      <Sports />
      {renderFullDocument()}
      <FlatList
        data={initialData.slice(0, visibleItemCount)}
        renderItem={renderListItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.loading}>No Articles Found</Text>}
      />

      {visibleItemCount < initialData.length && (
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
    textAlign: 'right',
    fontWeight: 'bold',
    alignItems:'flex-end',
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