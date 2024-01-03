import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,TouchableHighlight, FlatList, Animated, Button } from 'react-native';
import Sports from './Sports';

const initialdata =  require('../news.json');

const Trending = ({ navigation }) => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isSearchVisible ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [isSearchVisible, slideAnim]);

  const slideStyles = {
    transform: [
      {
        translateY: slideAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [-40, 0],
        }),
      },
    ],
  };
 
  const renderItem = ({ item }) => (
    <View style={styles.listItemContainer}>
      <Image source={{ uri: item.header_image }} style={styles.header_image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.date}>{item.news_post_date}</Text>
      <Text style={styles.content}>{item.content.slice(0, 89)} ....</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image source={require('./logo.png')} style={styles.image} />
      <View  >
      <Text style={styles.textnew}>Good Morning </Text>
      <Image source={require('./suns.png')} style={styles.image2} />
      </View>
      <TouchableOpacity onPress={() => setSearchVisible(!isSearchVisible)}>
        <Image
          source={require('./search.png')}
          style={styles.search}
        />
      </TouchableOpacity>

      {isSearchVisible && (
        <Animated.View style={[styles.buttonsContainer, slideStyles]}>
         <TouchableHighlight
            style={styles.button}
            underlayColor="#DDDDDD"
            onPress={() => navigation.navigate('International')}
          >
            <Text>International</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            underlayColor="#DDDDDD"
            onPress={() => navigation.navigate('Cricket')}
          >
            <Text>Sports</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            underlayColor="#DDDDDD"
            onPress={() => navigation.navigate('Urdu')}
          >
            <Text>Urdu</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            underlayColor="#DDDDDD"
            onPress={() => navigation.navigate('Videos')}
          >
            <Text>Videos</Text>
          </TouchableHighlight>

        </Animated.View>
      )}

      <Text style={styles.text}>Trending News</Text>
      <Sports style={styles.carousel} />

      <Text style={styles.text2}>Top Stories:</Text>

      <FlatList
        data={initialdata.slice(2000, 2011)}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
    backgroundColor: '#FBFBFB',
  },
  textnew: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#BB1919',
    marginLeft: 87,
    marginRight: 25,
    marginBottom: 20,
    marginTop: 20,
    fontFamily: 'cursive',
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#BB1919',
    marginLeft: -180,
    marginBottom: 320,
    fontFamily: 'sans-serif',
    fontStyle: 'italic',
    marginTop: -67,
  },
  button: {
    backgroundColor: '#BB1919',
    padding: 10,
    elevation: 2,
    textAlign: 'center',
    margin: 7,
    fontSize: 16,
    borderRadius: 10,
  },
  image: {
    width: 460,
    height: 65,
    resizeMode: 'contain',
    backgroundColor: '#BB1919',
  },
  image2: {
    width: 460,
    height: 65,
    marginTop: -65,
    marginLeft: 95,
    resizeMode: 'contain',
    
  },
  search: {
    width: 38,
    height: 38,
    resizeMode: 'contain',
    marginLeft: 310,
    marginTop: 10,
    marginBottom: 20,
  },
  carousel: {
    height: 200,
    borderRadius: 20,
    width: '100%',
  },
  text2: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#BB1919',
    marginLeft: -220,
    marginBottom: 10,
    fontFamily: 'sans-serif',
    fontStyle: 'italic',
    marginTop: -5,
  },
  listItemContainer: {
    padding: 15,
    height: 115,
    borderRadius: 20,
    backgroundColor: 'white',
    marginBottom: 10,
    marginStart: 5,
    marginEnd: 5,
    elevation: 8,
    shadowRadius: 10,
    shadowColor: 'black',
    borderColor: 'black',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 150,
    marginTop: -105,
  },
  date: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'grey',
    marginLeft: 150,
  },
  content: {
    fontSize: 13,
    alignContent: 'center',
    fontWeight: 'bold',
    color: '#2CA1DE',
    justifyContent: 'center',
    marginLeft: 150,
  },
  header_image: {
    width: 130,
    height: 95,
    marginBottom: 10,
    marginTop: -10,
    borderRadius: 20,
    resizeMode: 'contain',
  },
  buttonsContainer: {
    marginTop: -10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 20,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 10,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#FBFBFB',
    marginBottom: 80,
  },
});

export default Trending;
