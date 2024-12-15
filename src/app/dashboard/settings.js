import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

const Settings = () => {
  const handlePress = (option) => {
    alert(`${option} clicked!`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Account Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity style={styles.settingItem} onPress={() => handlePress('Edit Profile')}>
          <Ionicons name="create-outline" size={25} color="black" />
          <Text style={styles.settingText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem} onPress={() => handlePress('Security and Privacy')}>
          <Ionicons name="lock-closed-outline" size={25} color="black" />
          <Text style={styles.settingText}>Security and Privacy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem} onPress={() => handlePress('Notifications')}>
          <Ionicons name="notifications-outline" size={25} color="black" />
          <Text style={styles.settingText}>Notifications</Text>
        </TouchableOpacity>
      </View>

      {/* General Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>General</Text>
        <TouchableOpacity style={styles.settingItem} onPress={() => handlePress('Timer')}>
          <Ionicons name="timer-outline" size={25} color="black" />
          <Text style={styles.settingText}>Timer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem} onPress={() => handlePress('My Subscription')}>
          <Ionicons name="card-outline" size={25} color="black" />
          <Text style={styles.settingText}>My Subscription</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem} onPress={() => handlePress('Help and Support')}>
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
    backgroundColor: '#FFF',
    padding: 20,
  },
  sectionContainer: {
    marginBottom: 30,
    backgroundColor: '#F4F4F4',
    padding: 20,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#242426',
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  settingText: {
    fontSize: 16,
    color: '#242426',
    marginLeft: 10,
  },
});

export default Settings;
