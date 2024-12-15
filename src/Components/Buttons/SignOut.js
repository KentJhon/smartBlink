import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

const SignOutButton = () => {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => router.replace('/')}> 
      <Text style={styles.buttonText}>Sign Out</Text>
      <Ionicons name="log-out-outline" size={22} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingBottom: 70,
    paddingTop: 30
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0c3e27',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginRight: 8,
  },
});

export default SignOutButton;
