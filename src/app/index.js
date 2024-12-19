import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import LoginText from "../Typography/LoginText";
import EmailAddressInput from "../Components/Inputs/EmailAddressInput";
import PasswordInput from "../Components/Inputs/PasswordInput";
import LoginButton from "../Components/Buttons/LoginButton";
import NoAccountPrompt from "../Typography/NoAccountPrompt";
import { auth, db } from "../../firebase"; // Import Firebase Auth and Firestore
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore"; // For fetching data from Firestore
import { useRouter } from "expo-router";

// Helper function to validate email format
const validateEmailFormat = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter(); // Initialize router

  // Handle user login
  const handleLogin = async () => {
    if (!email) {
      Alert.alert("Login Failed", "Enter email address.");
      return;
    }

    if (!password) {
      Alert.alert("Login Failed", "Enter password.");
      return;
    }

    // Check if the email format is valid
    if (!validateEmailFormat(email)) {
      Alert.alert("Login Failed", "Invalid email format.");
      return;
    }

    try {
      // Search Firestore for a document where the email field matches the entered email
      const q = query(
        collection(db, "users"),
        where("email", "==", email.trim())
      ); // Trim the email to remove extra spaces
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // If no document is found with the entered email
        Alert.alert("Login Failed", "Account not found. Sign up First.");
        return;
      }

      // Fetch user data from Firestore
      const userData = querySnapshot.docs[0].data(); // Get the first matched document's data
      console.log("User data fetched: ", userData);

      // Proceed with sign-in if the email exists in Firestore
      await signInWithEmailAndPassword(auth, email.trim(), password); // Trim the email and use the password
      Alert.alert("Success", "Login successful!");
      router.replace("/dashboard");
    } catch (error) {
      const errorCode = error.code;
      console.log("Error Code:", errorCode);

      // Handling known errors
      if (
        errorCode === "auth/missing-password" ||
        errorCode === "auth/wrong-password"
      ) {
        Alert.alert("Login Failed", "Wrong email/password.");
      } else if (errorCode === "auth/invalid-email") {
        Alert.alert("Login Failed", "Invalid email format.");
      } else if (errorCode === "auth/user-not-found") {
        Alert.alert("Login Failed", "Account not found. Sign up First.");
      } else if (errorCode === "auth/invalid-credential") {
        Alert.alert("Login Failed", "Wrong Email/ Password.");
      } else {
        // Fallback for any unexpected errors
        Alert.alert("Error", "An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.panel}>
        <LoginText />
        <EmailAddressInput value={email} onChangeText={setEmail} />
        <PasswordInput value={password} onChangeText={setPassword} />
        <LoginButton onPress={handleLogin} />
        <NoAccountPrompt />
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

export default Login;
