import React, {useState, useRef, useEffect} from 'react';
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
  Pressable,
} from 'react-native';
import Sports from '../components/Sports3';
import RNFS from 'react-native-fs';


const initialData = require('../cricket.json');

const Cricket = ({navigation}) => {
 

  const stopwords = [
    'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', "you're", "you've", "you'll", "you'd",
    'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', "she's", 'her', 'hers', 'herself',
    'it', "it's", 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom',
    'this', 'that', "that'll", 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has',
    'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until',
    'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after',
    'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then',
    'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other',
    'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just',
    'don', "don't", 'should', "should've", 'now', 'd', 'll', 'm', 'o', 're', 've', 'y', 'ain', 'aren', "aren't", 'couldn',
    "couldn't", 'didn', "didn't", 'doesn', "doesn't", 'hadn', "hadn't", 'hasn', "hasn't", 'haven', "haven't", 'isn', "isn't",
    'ma', 'mightn', "mightn't", 'mustn', "mustn't", 'needn', "needn't", 'shan', "shan't", 'shouldn', "shouldn't", 'wasn', "wasn't",
    'weren', "weren't", 'won', "won't", 'wouldn', "wouldn't"
  ];

  const tokenizeText = text => {
    return text
    .split(/[^A-Za-z0-9]+/)
    .map(token => token.toLowerCase())
    .filter(token => token && !stopwords.includes(token));
};

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [newImage, setNewImage] = useState('');
  const [newCat, setNewCat] = useState('');
  const [newLink, setNewLink] = useState(''); // Added state for Link
  const [selectedItem, setSelectedItem] = useState(null);

  const [data, setData] = useState(initialData);
  const [startTime, setStartTime] = useState(null);
  const [isAddItemVisible, setAddItemVisible] = useState(false);

  const slideAnim1 = useRef(new Animated.Value(0)).current;
  const [isAddItemVisible1, setAddItemVisible1] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    Animated.timing(slideAnim1, {
      toValue: isAddItemVisible1 ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [slideAnim1, isAddItemVisible1]);

  const slideStyles1 = {
    height: slideAnim1.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 200],
    }),
    overflow: 'hidden',
  };

  const slideAnim2 = useRef(new Animated.Value(0)).current;
  const [isAddItemVisible2, setAddItemVisible2] = useState(false);

  useEffect(() => {
    Animated.timing(slideAnim2, {
      toValue: isAddItemVisible2 ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [slideAnim2, isAddItemVisible2]);

  const slideStyles2 = {
    height: slideAnim2.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 200],
    }),
    overflow: 'hidden',
  };

  const handleSearch = async () => {
    try {
      setStartTime(performance.now());
      setIsLoading(true);
  
      // Hide both carousels when search is initiated
      setAddItemVisible1(false);
      setAddItemVisible2(false);
  
      const results = await performSearch();
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const isStopword = (token) => {
    const stopwords = [
      'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', "you're", "you've", "you'll", "you'd",
    'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', "she's", 'her', 'hers', 'herself',
    'it', "it's", 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom',
    'this', 'that', "that'll", 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has',
    'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until',
    'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after',
    'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then',
    'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other',
    'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just',
    'don', "don't", 'should', "should've", 'now', 'd', 'll', 'm', 'o', 're', 've', 'y', 'ain', 'aren', "aren't", 'couldn',
    "couldn't", 'didn', "didn't", 'doesn', "doesn't", 'hadn', "hadn't", 'hasn', "hasn't", 'haven', "haven't", 'isn', "isn't",
    'ma', 'mightn', "mightn't", 'mustn', "mustn't", 'needn', "needn't", 'shan', "shan't", 'shouldn', "shouldn't", 'wasn', "wasn't",
    'weren', "weren't", 'won', "won't", 'wouldn', "wouldn't"
    ];
    return stopwords.includes(token || '');
  };

  const saveDataToJsonFile = async (updatedData) => {
    try {
      const path = RNFS.DocumentDirectoryPath + '/cricket.json';
      await RNFS.writeFile(path, JSON.stringify(updatedData), 'utf8');
    } catch (error) {
      console.error('Error writing to JSON file:', error);
    }
  };

  const addItem = () => {
    const newItem = {
      id: Math.random().toString(),
      title: newTitle,
      content: newContent,
      header_image: newImage,
      category: newCat,
      news_post_date: new Date().toDateString(),
    };

    const updatedData = [...data, newItem];
    setData(updatedData);
    saveDataToJsonFile(updatedData);

    setNewTitle('');
    setNewContent('');
    setNewImage('');
    setNewCat('');
    setAddItemVisible2(false);
  };

  const removeItem = (itemId) => {
    const updatedData = data.filter((item) => item.id !== itemId);
    setData(updatedData);
    saveDataToJsonFile(updatedData);
  };

 

  const performSearch = () => {
    return new Promise(resolve => {
      setTimeout(async () => {
        const results = await Promise.all(
          data.map(async document => {
            const queryWords = (searchQuery || '').toLowerCase().split(' ');
            const title = document.headline.toLowerCase();
            const content = document.summary.toLowerCase();

            const titleTokens = tokenizeText(title);
            const contentTokens = await tokenizeText(content);

            const tokenFrequency = queryWords.reduce((frequency, word) => {
              const titleWordCount = titleTokens.filter(
                token => token === word,
              ).length;
              const contentWordCount = contentTokens.filter(
                token => token === word,
              ).length;

              frequency[word] = titleWordCount + contentWordCount;
              return frequency;
            }, {});

            const score = Object.values(tokenFrequency).reduce(
              (total, count) => total + count,
              0,
            );

            const displayTime = new Date().toLocaleTimeString();
            const endTime = performance.now();
            const timeTaken = endTime - startTime;
            const newtimeTaken = timeTaken / 1000;
            const finl = newtimeTaken.toFixed(2);

            return {...document, score, displayTime, finl, tokenFrequency};
          }),
        );

        const sortedResults = results.sort((a, b) => b.score - a.score);
        resolve(sortedResults.slice(0, 20));
      }, 2000);
    });
  };

  const [isFullDocumentVisible, setFullDocumentVisible] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const showFullDocument = document => {
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
            <Image
              style={styles.Image}
              source={{uri: selectedDocument.image}}
            />
            <Text style={styles.detailtitle}>{selectedDocument.headline}</Text>
            <Text style={styles.Date}>{selectedDocument.date}</Text>

            <Text style={styles.detcontent}>{selectedDocument.summary}</Text>
            <Button title="Close" onPress={hideFullDocument} />
          </View>
        </ScrollView>
      </Modal>
    );
  };

  const renderListItem = ({item}) => (
    <View style={styles.listItemContainer}>
      <Text style={styles.Date}>{item.date}</Text>
      <Text style={styles.Category}>Category: Sports</Text>
      <Image style={styles.Image2} source={{uri: item.image}} />
      <Text style={styles.score}>{item.finl} milliseconds</Text>
      <Text style={styles.score2}>Score: {item.score.toFixed(4)}</Text>
      <Text style={styles.documenttitle}>{item.headline}</Text>
      <Text style={styles.content}>{item.summary} ........</Text>

      <TouchableOpacity
        onPress={() => showFullDocument(item)}
        style={styles.fullbuttons}>
        <Text style={styles.detbuttonText}>Read Full Document</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleVisibility} style={styles.buttons}>
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>

      {isVisible && (
        <Text style={[styles.hiddenText, {opacity: isVisible ? 1 : 0}]}>
          <Text style={styles.frequency}>
            {JSON.stringify(item.tokenFrequency) + '\n' || 'N/A'}
          </Text>
        </Text>
      )}

      <TouchableOpacity
        onPress={() => removeItem(item.id)}
        style={styles.Button2}>
        <Text style={styles.buttonText}>Delete</Text>

      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
       <Image source={require('./logo.png')} style={styles.image} />

       

       
      <TouchableOpacity
        onPress={() => setAddItemVisible1(!isAddItemVisible1)}
        style={styles.searchIconContainer}>
        <Image
          style={styles.search}
          source={require('../components/search.png')}
        />
      </TouchableOpacity>
      <Text style={styles.top}>Cricket Headlines</Text>

      <Sports />
      <Animated.View style={[styles.slideContainer, slideStyles1]}>
        <ScrollView>
          <TextInput
            style={styles.input}
            placeholder="Enter your query"
            value={searchQuery}
            placeholderTextColor={'#333'}
            onChangeText={text => setSearchQuery(text)}
          />
          <View style={styles.buttonContainer}>
            <Button title="Search" onPress={handleSearch} />
          </View>

          <Text
            style={styles.heading2}
            onPress={() => setAddItemVisible2(!isAddItemVisible2)}>
            Click to Add Document
          </Text>
        </ScrollView>
      </Animated.View>

      {renderFullDocument()}

      <Animated.View style={[styles.slideContainer, slideStyles2]}>
        <ScrollView>
          <TextInput
            style={styles.input2}
            placeholder="Title"
            placeholderTextColor={'#333'}
            value={newTitle}
            onChangeText={text => setNewTitle(text)}
          />
          <TextInput
            style={styles.input2}
            placeholder="Content"
            placeholderTextColor={'#333'}
            value={newContent}
            onChangeText={text => setNewContent(text)}
          />
          <TextInput
            style={styles.input2}
            placeholder="Link"
            placeholderTextColor={'#333'}
            value={newLink}
            onChangeText={text => setNewLink(text)}
          />
          
          <TextInput
            style={styles.input2}
            placeholder="Category"
            placeholderTextColor={'#333'}
            value={newCat}
            onChangeText={text => setNewCat(text)}
          />

          <TextInput
            style={styles.input2}
            placeholder="Header Image"
            placeholderTextColor={'#333'}
            value={newImage}
            onChangeText={text => setNewImage(text)}
          />

          <View style={styles.buttonContainer}>
            <Button title="Add Item" onPress={addItem} />
          </View>
        </ScrollView>
      </Animated.View>
     

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="black" />
          <Text style={styles.loading}>Searching...</Text>
        </View>
      )}

      {searchResults.length > 0 ? (
        <FlatList style={{ marginTop: -10 }}
          data={searchResults}
          renderItem={renderListItem}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text style={styles.loading}>No matching documents found</Text>
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
    marginTop: 295,
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
    fontSize: 15,
    marginTop: 6,
    marginBottom: 5,
  },
  buttonText2: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 19,
    marginTop: -40,
    
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
    textAlign: 'justify',
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
    backgroundColor: '#4CAF50',
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
    textAlign: 'justify',
    lineHeight: 18,
    marginTop: -4,
    fontStyle: 'italic',
    marginBottom: 16,
  },
  detcontent: {
    fontSize: 16,
    marginTop: 16,
    color: 'black',
    textAlign: 'justify',
    lineHeight: 18,
    fontStyle: 'italic',
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

  frequencybutton: {
    fontSize: 16,
    color: 'steelblue',
    fontWeight: 'bold',
    marginBottom: 10,
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