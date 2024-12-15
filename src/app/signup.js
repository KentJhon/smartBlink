import { View, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import SignUpText from "../Typography/SignUpText";
import EmailAddressInput from "../Components/Inputs/EmailAddressInput";
import PasswordInput from "../Components/Inputs/PasswordInput";
import ConfirmPasswordInput from "../Components/Inputs/ConfirmPasswordInput";
import SignUpButton from "../Components/Buttons/SignUpButton";
import AccountPrompt from "../Typography/AccountPrompt";
import { useRouter } from "expo-router"; // Importing router from expo-router

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter(); // Initialize router for navigation

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    // Here, you can add logic to save the data locally or use another API for handling sign-ups

    Alert.alert("Success", "User registered successfully!");

    // Navigate to Dashboard page after successful sign up
    router.push("/dashboard"); // Navigate to the dashboard screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.panel}>
        <SignUpText />
        <EmailAddressInput value={email} onChangeText={setEmail} />
        <PasswordInput value={password} onChangeText={setPassword} />
        <ConfirmPasswordInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <SignUpButton onPress={handleSignUp} />
        <AccountPrompt />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  panel: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

export default SignUp;
