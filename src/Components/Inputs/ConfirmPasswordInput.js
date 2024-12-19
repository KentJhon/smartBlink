import React from "react";
import { TextInput, StyleSheet, View, Dimensions, Text } from "react-native";

const { width } = Dimensions.get("window");

const ConfirmPasswordInput = ({ value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={value} // Bind the value prop
        onChangeText={onChangeText} // Bind the onChangeText handler
        secureTextEntry // Hide password characters
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.9,
    padding: 10,
  },
  label: {
    fontSize: 16,
    alignSelf: "flex-start",
    padding: 5,
    paddingBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: "100%",
  },
});

export default ConfirmPasswordInput;
