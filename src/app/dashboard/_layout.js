import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
      screenOptions={{
        headerTintColor: '#0c3e27',
        headerTitleStyle: { color: 'black' },
        drawerActiveTintColor: '#0c3e27',
        drawerInactiveTintColor: 'gray',
      }}
      >
        <Drawer.Screen 
          name="(tabs)" 
          options={{ title: 'SmartBlink' }} 
        />
        <Drawer.Screen 
          name="settings" 
          options={{ title: 'Settings' }} 
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
