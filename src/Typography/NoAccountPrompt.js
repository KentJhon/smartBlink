import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const NoAccountPrompt = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.teext}>Don't Have an Account?</Text>
      <TouchableOpacity onPress={() => router.push("signup")}>
        <Text style={styles.signUp}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  teext: {
    fontSize: 16,
  },
  signUp: {
    fontSize: 16,
    textDecorationLine: "underline",
    color: "#0c3e27",
  },
});

export default NoAccountPrompt;
