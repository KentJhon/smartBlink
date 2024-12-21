import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { auth, db } from "../../../firebase"; // Import Firebase config and Firestore
import { doc, getDoc } from "firebase/firestore"; // Firestore functions

const Settings = () => {
  const [timer, setTimer] = useState(""); // Timer input state
  const [unit, setUnit] = useState("seconds"); // Timer unit state (e.g., minutes or seconds)
  const [esp8266IP, setIP] = useState(""); // State to store the IP address
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [errorMessage, setErrorMessage] = useState(""); // State for error message (empty IP)
  const [subscriptionStatus, setSubscriptionStatus] = useState("Free"); // Placeholder for subscription status

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

  // Handle saving the IP Address and displaying success message
  const handleSaveIP = () => {
    if (esp8266IP.trim() === "") {
      setErrorMessage("Enter IP address"); // Show error if IP is empty
      setSuccessMessage(""); // Clear success message if there's an error
    } else {
      console.log("IP Address saved:", esp8266IP);
      setSuccessMessage("Success, IP address saved successfully");
      setErrorMessage(""); // Clear error message when IP is valid
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* General Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>General</Text>

        {/* IP Address Input */}
        <View style={styles.timerContainer}>
          <TextInput
            style={styles.input}
            value={esp8266IP} // Display the full IP address
            onChangeText={(text) => {
              // Ensure the value starts with "http://"
              const formattedIP = text.startsWith("http://")
                ? text
                : `http://${text}`;
              setIP(formattedIP);
              setErrorMessage(""); // Clear error message when typing
            }}
            placeholder="Enter ESP8266 IP (e.g., 192.168.1.1)"
            keyboardType="default"
          />
        </View>

        {/* Error Message for Empty IP */}
        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}

        <View style={styles.saveButton}>
          <Text style={styles.saveButtonText} onPress={handleSaveIP}>
            Save IP Address
          </Text>
        </View>

        {/* Success Message */}
        {successMessage ? (
          <Text style={styles.successMessage}>{successMessage}</Text>
        ) : null}

        {/* My Subscription Section */}
        <View style={styles.settingItem}>
          <Ionicons name="card-outline" size={25} color="black" />
          <Text style={styles.settingText}>My Subscription</Text>
          <Text style={styles.subscriptionStatus}>{subscriptionStatus}</Text>
        </View>

        {/* Help and Support Section */}
        <View style={styles.settingItem}>
          <Ionicons name="help-circle-outline" size={25} color="black" />
          <Text style={styles.settingText}>Help and Support</Text>
          <Text style={styles.contactEmail}>smartblink@gmail.com</Text>
        </View>
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
  subscriptionStatus: {
    fontSize: 16,
    color: "#242426",
    marginLeft: 10,
    fontWeight: "bold",
    marginTop: 5,
  },
  contactEmail: {
    fontSize: 16,
    color: "#242426",
    marginLeft: 10,
    marginTop: 5,
    fontWeight: "bold",
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
  successMessage: {
    fontSize: 16,
    color: "green",
    marginTop: 10,
    textAlign: "center",
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
});

export default Settings;
