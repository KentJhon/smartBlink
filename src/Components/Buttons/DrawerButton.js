import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const DrawerButton = () => {
  const Layout = () => {
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Ionicons name="menu-outline" size={35} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});

export default DrawerButton;