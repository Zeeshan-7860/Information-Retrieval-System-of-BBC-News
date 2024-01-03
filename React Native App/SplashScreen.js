import React, { useRef, useEffect, useState } from 'react';
import { View, Animated, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';

const HeartAnimationApp = ({ navigation }) => {
  const [showButton, setShowButton] = useState(false);
  const fadeAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    const fadeInAnimation = Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 4000,
      useNativeDriver: true,
    });

    // Start the fade in animation
    fadeInAnimation.start(() => {
      // Animation completed, show the button
      setShowButton(true);
    });

    // Cleanup animation on component unmount
    return () => {
      fadeInAnimation.stop();
    };
  }, [fadeAnim]);

  const animatedStyle = {
    opacity: fadeAnim.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 1],
    }),
    transform: [{ translateX: fadeAnim }],
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.text, animatedStyle]}>Information Retrieval System</Animated.Text>
      <Animated.Image
        style={[styles.heart, animatedStyle]}
        source={require('../components/bbc.jpg')}
      />
      {showButton && (
        <Animated.View style={[styles.buttonContainer, animatedStyle]}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Trending')}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#BB1919',
    borderWidth: 2,
    borderRadius: 3,
  },
  heart: {
    width: 260,
    height: 260,
    backgroundColor: 'white',
    resizeMode: 'contain',
    marginBottom: 20,
    marginTop: -60,
  },
  text: {
    fontSize: 34.5,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#BB1919',
    fontFamily: 'cursive',
    marginBottom: 120,
    marginTop: -70,
  },
  buttonContainer: {
    marginTop: 50,
  },
  button: {
    width: 120,
    height: 45,
    backgroundColor: '#BB1919',
    borderRadius: 20,
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
});

export default HeartAnimationApp;
