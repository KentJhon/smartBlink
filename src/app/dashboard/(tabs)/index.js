import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

const Home = () => {
  const handlePress = () => {
    alert('Connecting!');
  };

  return (
    <View style={styles.container}>
      {/* Background Section */}
      <ImageBackground
        source={require('../../../assets/background.png')}
        style={styles.background}
      >
        {/* Status Section */}
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>Status</Text>
          <Text style={styles.status}>Connected/Not Connected</Text>
        </View>

        {/* Button Section */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.roundButton} onPress={handlePress}>
            <Ionicons name="power-outline" size={75} color="black" />
            <Text style={styles.buttonText}>Activate</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* Location Section */}
      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>Location</Text>
        <Text style={styles.location}>Not Yet Connected</Text>
      </View>

      {/* Premium Section */}
      <TouchableOpacity style={styles.premiumContainer}>
        <Text style={styles.premiumText}>Go Premium!</Text>
        <View style={styles.premiumHeader}>
          <Ionicons name="play-forward-sharp" size={25} color='#FEB340' style={styles.icon} />
          <Text style={styles.premium}>Real Time Device Information</Text>
        </View>

        <View style={styles.premiumHeader}>
          <Ionicons name="location-sharp" size={25} color='#FEB340' style={styles.icon} />
          <Text style={styles.premium}>Automatic Signal Light</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  background: {
    flex: 2,
    resizeMode: 'cover',
  },
  statusContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 30,
  },
  statusText: {
    fontSize: 16,
    paddingBottom: 10,
    color: '#FFF',
  },
  status: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 30,
    color: '#FFF',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [
      { translateX: -90 },
      { translateY: -90 },
    ],
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    zIndex: 999,
  },
  buttonText: {
    fontSize: 16,
    padding: 5,
  },
  locationContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    padding: 30,
  },
  locationText: {
    fontSize: 16,
    color: '#C7C7CC',
    paddingBottom: 10,
  },
  location: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 10,
    color: '#000',
  },
  premiumContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#242426',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    width: '80%',
    alignSelf: 'center',
  },
  premiumHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  premiumText: {
    color: '#FEB340',
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  premium: {
    color: 'white',
    padding: 5,
  },
  icon: {
    paddingLeft: 10
  }
});

export default Home;
