import React from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import DownloadScreen from '../../../Screen/DownloadScreen';
// import ListLesson from '../../CoursesDetail/ListLesson/list-lesson';
const DownloadStack = createStackNavigator();
// import ImageButton from '../../Common/image-button'
const DownloadNavigation = (props, navigation) => {
  return (
    <DownloadStack.Navigator
      headerMode='none'
    >
      <DownloadStack.Screen
        name='DownloadScreen'
        component={DownloadScreen}
      >
      </DownloadStack.Screen>

    </DownloadStack.Navigator>

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
export default DownloadNavigation