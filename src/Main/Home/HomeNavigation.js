import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from './HomeScreen';
const HomeStack = createStackNavigator();
const HomeNavigation = (props, navigation) => {
  return (
    <HomeStack.Navigator
      headerMode='none'
    >
      <HomeStack.Screen
        name='HomeScreen'
        component={HomeScreen}
      >
      </HomeStack.Screen>

    </HomeStack.Navigator>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 10,
    backgroundColor: '#0E0F13',
  },

});
export default HomeNavigation