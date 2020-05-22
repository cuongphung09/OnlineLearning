import React from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen from '../../../Screen/ProfileScreen';
import HomeScreen from './HomeScreen';
import DownloadScreen from '../../../Screen/DownloadScreen';
// import ListLesson from '../../CoursesDetail/ListLesson/list-lesson';
const HomeStack = createStackNavigator();
// import ImageButton from '../../Common/image-button'
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