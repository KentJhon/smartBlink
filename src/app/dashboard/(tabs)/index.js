import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "../../../../firebase"; // Update this path to match your Firebase configuration file.
import axios from "axios"; // Make sure you have axios installed for HTTP requests

const Home = () => {
  const [timer, setTimer] = useState(""); // Timer input state
  const [unit, setUnit] = useState("minutes"); // Timer unit state (e.g., minutes or seconds)
  const esp8266IP = "http://172.20.10.4"; // IP of your ESP8266
  const [status, setStatus] = useState("Not Connected"); // Local state for status
  const userId = auth.currentUser?.uid; // Use current user's ID dynamically
  const [location, setLocation] = useState("Set your Location"); // Default location state

  // Function to fetch initial status from the database
  const fetchStatus = async () => {
    try {
      if (userId) {
        const userDocRef = doc(db, "users", userId); // Reference to the user's document
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setStatus(userData.status || "Not Connected"); // Set status if it exists, else default
        }
      }
    } catch (error) {
      console.error("Error fetching status:", error);
    }
  };

  useEffect(() => {
    if (userId) fetchStatus();
  }, [userId]);

  // Fetch location from the database
  useEffect(() => {
    const fetchLocation = async () => {
      if (userId) {
        try {
          const userDocRef = doc(db, "users", userId); // Reference to the user's document
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setLocation(userData.address || "Set your Location"); // Set address or default
          }
        } catch (error) {
          console.error("Error fetching location:", error);
        }
      }
    };

    fetchLocation(); // Fetch location when the component mounts
  }, [userId]);

  const handlePress = async () => {
    try {
      const newStatus = status === "Connected" ? "Not Connected" : "Connected"; // Toggle status
      setStatus(newStatus); // Update local state

      if (userId) {
        const userDocRef = doc(db, "users", userId); // Reference to the user's document
        const userDoc = await getDoc(userDocRef);

        // Check if the document exists; create it if it doesn't
        if (!userDoc.exists()) {
          console.log("User document does not exist. Creating a new document.");
          await setDoc(userDocRef, { status: newStatus }); // Create document with status
        } else {
          console.log("User document exists. Updating status.");
          await updateDoc(userDocRef, { status: newStatus }); // Update the existing document
        }

        alert(`Status updated to ${newStatus}`);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  const setTimerOnESP8266 = async () => {
    try {
      const response = await axios.get(
        `${esp8266IP}/set_timer?duration=${timer}`
      );
      console.log("Timer set on ESP8266:", response.data);
    } catch (error) {
      console.error("Error setting timer on ESP8266:", error);
    }
  };

  const handleSaveTimer = async () => {
    if (auth.currentUser) {
      try {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userDocRef, {
          timer: timer,
          unit: unit,
        });

        alert(`Timer set for ${timer} ${unit}`);
      } catch (error) {
        alert("Error saving timer: " + error.message);
      }
    }
  };

  const handleSaveTimerAndSetOnESP = () => {
    handleSaveTimer();
    setTimerOnESP8266();
  };

  useEffect(() => {
    const fetchTimerData = async () => {
      if (auth.currentUser) {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.timer && userData.unit) {
            setTimer(userData.timer);
            setUnit(userData.unit);
          }
        }
      }
    };

    fetchTimerData(); // Fetch saved timer when the component mounts
  }, []);

  const toggleSignal = async (signalType) => {
    try {
      const response = await axios.get(`${esp8266IP}/${signalType}/toggle`);
      console.log(`${signalType} signal toggled: ${response.data}`);
    } catch (error) {
      console.error("Error toggling signal:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Section */}
      <ImageBackground
        source={require("../../../assets/background.png")}
        style={styles.background}
      >
        {/* Status Section */}
        <View style={styles.sectionContainer}>
          {/* Timer Section with Input */}
          <View style={styles.timerContainer}>
            <TextInput
              style={styles.input}
              value={timer}
              onChangeText={setTimer}
              placeholder="Enter time in seconds"
              keyboardType="numeric"
            />
          </View>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveTimerAndSetOnESP}
          >
            <Text style={styles.saveButtonText}>Save Timer</Text>
          </TouchableOpacity>

          {/* Left and Right Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttons}
              onPress={() => toggleSignal("left")}
            >
              <Text style={styles.buttonText}>Left</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttons}
              onPress={() => toggleSignal("hazard")}
            >
              <Text style={styles.buttonText}>Hazard</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttons}
              onPress={() => toggleSignal("right")}
            >
              <Text style={styles.buttonText}>Right</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      {/* Location Section */}
      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>Location</Text>
        <Text style={styles.location}>{location}</Text>
      </View>

      {/* Premium Section */}
      <TouchableOpacity style={styles.premiumContainer}>
        <Text style={styles.premiumText}>Go Premium!</Text>
        <View style={styles.premiumHeader}>
          <Ionicons
            name="play-forward-sharp"
            size={25}
            color="#FEB340"
            style={styles.icon}
          />
          <Text style={styles.premium}>Real Time Device Information</Text>
        </View>
        <View style={styles.premiumHeader}>
          <Ionicons
            name="location-sharp"
            size={25}
            color="#FEB340"
            style={styles.icon}
          />
          <Text style={styles.premium}>Automatic Signal Light</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  background: {
    flex: 2,
    resizeMode: "cover",
  },
  sectionContainer: {
    marginTop: 10,
    marginBottom: 30,
    backgroundColor: "#F4F4F4",
    padding: 20,
    borderRadius: 10,
  },
  timerContainer: {
    padding: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  input: {
    fontSize: 16,
    color: "#242426",
    backgroundColor: "#FFF",
    borderColor: "#CCC",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: "100%",
  },

  saveButton: {
    backgroundColor: "#0c3e27",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  buttons: {
    backgroundColor: "#0c3e27",
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
  locationContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    backgroundColor: "white",
    padding: 30,
  },
  locationText: {
    fontSize: 16,
    color: "#C7C7CC",
    paddingBottom: 10,
  },
  location: {
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 10,
    color: "#000",
  },
  premiumContainer: {
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#242426",
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    width: "80%",
    alignSelf: "center",
  },
  premiumHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  premiumText: {
    color: "#FEB340",
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  premium: {
    color: "white",
    padding: 5,
  },
  icon: {
    paddingLeft: 10,
  },
});

export default Home;
