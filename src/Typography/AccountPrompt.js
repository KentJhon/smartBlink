import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const AccountPrompt = ({ setCurrentPanel }) => {

  const router = useRouter()

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Already Have an Account? </Text>
      <TouchableOpacity style={styles.button} onPress={() => router.back()}> 
        <Text style={styles.logIn}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
  },
  text: {
    fontSize: 16,
  },
  logIn: {
    fontSize: 16,
    textDecorationLine: 'underline',
    color: '#0c3e27',
  },
});

export default AccountPrompt;
