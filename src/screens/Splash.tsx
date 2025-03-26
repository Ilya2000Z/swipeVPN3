import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Colors } from '../theme/Colors';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/splash/logo_original.png')} 
        style={styles.logo} 
        resizeMode="contain"
      />
      <Text style={styles.versionText}>Version 1.0</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  logo: {
    width: 150,
    height: 150,
  },
  versionText: {
    color: 'white',
    position: 'absolute',
    bottom: 50,
    fontSize: 16,
  },
});

export default SplashScreen;
