import SectionCourses from "./SectionCourses/section-courses"
import React from 'react'
import { View, StyleSheet, ImageBackground, TouchableOpacity, Text, ScrollView } from 'react-native'
const HomeScreen = ({navigation}) => {
   return (
      <ScrollView style={styles.container}>
         <ImageBackground style={{ height: 100, justifyContent: 'flex-end' }} source={{ uri: 'https://image.freepik.com/free-vector/abstract-technology-particle-background_52683-25766.jpg' }}>
            <Text style={{ color: '#d6d6d6', marginBottom: 5 }}>Welcome to PluralSight!</Text>
         </ImageBackground>
         <Text style={{ color: 'white', fontSize: 15, paddingTop: 10, paddingBottom: 20, fontWeight: 'bold' }}>With PluralSight, you can build and apply skills in top technologies.</Text>
         <SectionCourses title='Software Development' navigation={navigation}  onPress={() => navigation.navigate("ListLesson",{title:'Software Development'})}/>
         <SectionCourses title='IT operations' navigation={navigation} onPress={() => navigation.navigate("ListLesson",{title:'IT operations'})}/>
         <SectionCourses title='Data Professional' navigation={navigation} onPress={() => navigation.navigate("ListLesson",{title:'Data Professional'})}/> 
      </ScrollView>
   )
}
const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingLeft: 10,
      paddingTop: 10,
      backgroundColor: '#0E0F13',
   },
})
export default HomeScreen