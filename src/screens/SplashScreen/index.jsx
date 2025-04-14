import React from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';

function SplashScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Image
        source={require('../../assets/sphere.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>SwipeVPN</Text>
      <Text style={styles.version}>Version 1.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 40,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  version: {
    color: '#ccc',
    fontSize: 16,
    marginTop: 10,
  },
});

export default SplashScreen;
