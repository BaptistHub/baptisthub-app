import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const LoadingScreen = () => {
  return (
    <LinearGradient colors={['#040306', '#131624']} style={styles.container}>
        <ActivityIndicator size="100" color="white" />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // You can change this to match your app's theme
  },
});

export default LoadingScreen;
