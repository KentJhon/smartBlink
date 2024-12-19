import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../../../firebase'; // Update this path to match your Firebase configuration file.
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Home = () => {
  const [status, setStatus] = useState('Not Connected'); // Local state for status
  const userId = 'USER_ID_HERE'; // Replace with the current user's ID or retrieve dynamically.

  // Function to fetch initial status from the database
  const fetchStatus = async () => {
    try {
      const userDocRef = doc(db, 'users', userId); // Reference to the user's document
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setStatus(userData.status || 'Not Connected'); // Set status if it exists, else default
      }
    } catch (error) {
      console.error('Error fetching status:', error);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handlePress = async () => {
  try {
    const newStatus = status === 'Connected' ? 'Not Connected' : 'Connected'; // Toggle status
    setStatus(newStatus); // Update local state

    const userDocRef = doc(db, 'users', userId); // Reference to the user's document

    // Check if the document exists; create it if it doesn't.
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      console.log("User document does not exist. Creating a new document.");
      await setDoc(userDocRef, { status: newStatus }); // Create document with `status`
    } else {
      console.log("User document exists. Updating status.");
      await updateDoc(userDocRef, { status: newStatus }); // Update the existing document
    }

    alert(`Status updated to ${newStatus}`);
  } catch (error) {
    console.error("Error updating status:", error);
    alert("Failed to update status");
  }
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
          <Text style={styles.statusText}></Text>
          <Text style={styles.status}></Text>
        </View>

        {/* Button Section */}
        <View style={styles.buttonContainer}>
          <View style={styles.roundButton} onPress={handlePress}>
          <MaterialCommunityIcons name="horse-variant" size={120} color="black" />
            {/* <Text style={styles.buttonText}>{status === 'Connected' ? 'Deactivate' : 'Activate'}</Text> */}
          </View>
        </View>
      </ImageBackground>

      {/* Location Section */}
      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>Location</Text>
        <Text style={styles.location}>Cagayan de Oro City</Text>
      </View>

      {/* Premium Section */}
      <TouchableOpacity style={styles.premiumContainer}>
        <Text style={styles.premiumText}>Go Premium!</Text>
        <View style={styles.premiumHeader}>
          <Ionicons name="play-forward-sharp" size={25} color="#FEB340" style={styles.icon} />
          <Text style={styles.premium}>Real Time Device Information</Text>
        </View>

        <View style={styles.premiumHeader}>
          <Ionicons name="location-sharp" size={25} color="#FEB340" style={styles.icon} />
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
    transform: [{ translateX: -90 }, { translateY: -90 }],
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
    paddingLeft: 10,
  },
});

export default Home;
