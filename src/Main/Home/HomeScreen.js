import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { color } from 'react-native-reanimated';
import { withTheme } from 'react-native-elements';
import SectionCourses from "./SectionCourses/section-courses"
const HomeScreen = ( props, navigation )=> {
  return (
    <ScrollView style={styles.container}>
      <SectionCourses  title='Software Development'/>
      <SectionCourses  title='IT operations'/>
      <SectionCourses  title='Data Professional'/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // // backgroundColor: '#fff',
    // display: 'flex',
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    paddingLeft: 10,
    paddingTop: 10,
    backgroundColor: '#000',
  },

});
export default HomeScreen