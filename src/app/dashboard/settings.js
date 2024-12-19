import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { auth, db } from "../../../firebase"; // Import Firebase config and Firestore
import { doc, updateDoc, getDoc } from "firebase/firestore"; // Firestore functions
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import axios from "axios"; // Make sure you have axios installed for HTTP requests

const Settings = () => {
  const [timer, setTimer] = useState(""); // Timer input state
  const [unit, setUnit] = useState("seconds"); // Timer unit state (e.g., minutes or seconds)
  const router = useRouter();
  const [esp8266IP, setIP] = useState("");
  // const esp8266IP = "http://172.20.10.4"; // IP of your ESP8266

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

  const handlePress = (option) => {
    alert(`${option} clicked!`);
  };

  const handleSaveTimerAndSetOnESP = () => {
    // Call both functions
    handleSaveTimer();
    setTimerOnESP8266();
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

  const toggleSignal = async (signalType) => {
    try {
      const response = await axios.get(`${esp8266IP}/${signalType}/toggle`);
      console.log(`${signalType} signal toggled: ${response.data}`);
    } catch (error) {
      console.error("Error toggling signal:", error);
    }
  };

  const setTimerOnESP8266 = async () => {
    console.log(`${esp8266IP} `);
    try {
      const response = await axios.get(
        `${esp8266IP}/set_timer?duration=${timer}`
      );
      console.log("Timer set on ESP8266:", response.data);
    } catch (error) {
      console.error("Error setting timer on ESP8266:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Account Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => toggleSignal("left")} // Toggle left signal
          >
            <Text style={styles.buttonText}>Left</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => toggleSignal("right")} // Toggle right signal
          >
            <Text style={styles.buttonText}>Right</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* General Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>General</Text>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => handlePress("Timer")}
        >
          <Ionicons name="globe-outline" size={25} color="black" />
          <Text style={styles.settingText}>IP Address</Text>
        </TouchableOpacity>

        {/* Timer Section with Input and Dropdown */}
        <View style={styles.timerContainer}>
          <TextInput
            style={styles.input}
            value={timer}
            onChangeText={setIP}
            placeholder="http://"
            keyboardType="numeric"
          />
          {/* <Picker
            selectedValue={unit}
            style={styles.picker}
            onValueChange={(itemValue) => setUnit(itemValue)}
          >
            <Picker.Item label="Minutes" value="minutes" />
            <Picker.Item label="Seconds" value="seconds" />
          </Picker> */}
        </View>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveTimerAndSetOnESP}
        >
          <Text style={styles.saveButtonText}>Save IP Address</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => handlePress("My Subscription")}
        >
          <Ionicons name="card-outline" size={25} color="black" />
          <Text style={styles.settingText}>My Subscription</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => handlePress("Help and Support")}
        >
          <Ionicons name="help-circle-outline" size={25} color="black" />
          <Text style={styles.settingText}>Help and Support</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFF",
    padding: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttons: {
    backgroundColor: "#0c3e27",
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
  sectionContainer: {
    marginBottom: 30,
    backgroundColor: "#F4F4F4",
    padding: 20,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#242426",
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  settingText: {
    fontSize: 16,
    color: "#242426",
    marginLeft: 10,
  },
  timerContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
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
  picker: {
    height: 50,
    width: "30%",
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
});

export default Settings;
