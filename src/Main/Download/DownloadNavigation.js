import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import DownloadScreen from '../../../Screen/DownloadScreen';
const DownloadStack = createStackNavigator();
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