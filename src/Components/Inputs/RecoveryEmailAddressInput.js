import React from 'react';
import { TextInput, StyleSheet, View, Dimensions, Text, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

const RecoveryEmailAddressInput = () => {
  const handleSendOTP = () => {
    // Logic to send OTP goes here
    console.log('OTP sent');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email Address</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email address"
        />
        <TouchableOpacity onPress={handleSendOTP}>
          <Text style={styles.otpButton}>Send OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.9,
    padding: 10,
  },
  label: {
    fontSize: 16,
    alignSelf: 'flex-start',
    padding: 5,
    paddingBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    flex: 1,
  },
  otpButton: {
    marginLeft: 10,
    color: '#0c3e27',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default RecoveryEmailAddressInput;
