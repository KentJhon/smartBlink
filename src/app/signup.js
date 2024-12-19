import { View, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import SignUpText from "../Typography/SignUpText";
import EmailAddressInput from "../Components/Inputs/EmailAddressInput";
import PasswordInput from "../Components/Inputs/PasswordInput";
import ConfirmPasswordInput from "../Components/Inputs/ConfirmPasswordInput";
import SignUpButton from "../Components/Buttons/SignUpButton";
import AccountPrompt from "../Typography/AccountPrompt";
import { useRouter } from "expo-router"; // Importing router from expo-router
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase"; // Firebase initialization

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter(); // Initialize router for navigation

  // Firebase Auth and Firestore initialization
  const auth = getAuth();
  const db = getFirestore();

  // Helper function to validate email format
  const validateEmailFormat = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  // Helper function to validate password strength
  const validatePasswordStrength = (password) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    return passwordRegex.test(password);
  };

  const handleSignUp = async () => {
    // Check if passwords match
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    // Validate email format
    if (!validateEmailFormat(email)) {
      Alert.alert("Error", "Sign up failed. Invalid Email Format.");
      return;
    }

    // Validate password strength
    if (!validatePasswordStrength(password)) {
      Alert.alert(
        "Sign up Failed",
        "Password must be at least 6 characters long, contain at least one uppercase letter, one number, and one special character."
      );
      return;
    }

    try {
      // Create user with email and password using Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Get the user details
      const user = userCredential.user;

      // Save user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: new Date(),
      });

      Alert.alert("Success", "User registered successfully!");

      // Navigate to the Dashboard page after successful sign-up
      router.push("/dashboard");
    } catch (error) {
      const errorCode = error.code;

      // Handling known Firebase error codes with user-friendly messages
      if (errorCode === "auth/email-already-in-use") {
        Alert.alert("Error", "Email is already in use.");
      } else if (errorCode === "auth/invalid-email") {
        Alert.alert("Error", "Sign up failed. Invalid Email Format.");
      } else if (errorCode === "auth/weak-password") {
        Alert.alert(
          "Error",
          "Password is too weak. It must contain at least 6 characters, one uppercase letter, one number, and one special character."
        );
      } else {
        // Fallback for any other unexpected errors
        Alert.alert("Error", "Sign up failed. Please try again.");
      }
    }
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
