import React from 'react';
import { Avatar } from 'react-native-elements';
import { StyleSheet, Text, View } from 'react-native';
import BrowseStackNavigation from "./Screen/Browse/BrowseStackNavigation"
import HomeStackNavigation from "./Screen/Home/HomeStackNavigation"
import DownloadStackNavigation from "./Screen/Download/DownloadStackNavigation"
import SearchScreen from "./Screen/Search/SearchScreen"
import ProfileScreen from "./Screen/ProfileScreen"
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createBottomTabNavigator();
import { NavigationContainer } from '@react-navigation/native';
import { ScreenStack } from 'react-native-screens';
import { createStackNavigator } from '@react-navigation/stack';
const mainStack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="BrowseScreen"
      >
        <Tab.Screen name="HomeStackNavigation" component={HomeStackNavigation}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home-outline" color={color} size={size} />
            ),
          }} />
        <Tab.Screen name="DownloadScreen" component={DownloadStackNavigation}
          options={{
            tabBarLabel: 'Download',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="download" color={color} size={size} />
            ),
          }} />
        <Tab.Screen name="BrowseScreen" component={BrowseStackNavigation}
          options={{
            tabBarLabel: 'Browse',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="grid" color={color} size={size} />
            ),
          }} />
        <Tab.Screen name="Search" component={SearchScreen}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="magnify" color={color} size={size} />
            ),
          }}
        />
        
      </Tab.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
