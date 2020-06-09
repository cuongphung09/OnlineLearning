import SectionCourses from "./SectionCourses/section-courses"
import React from 'react'
import { View, StyleSheet, ImageBackground, TouchableOpacity, Text, ScrollView, Dimensions } from 'react-native'
import headerRight from "../../Component/headerRight"
import ThemeContext from '../../../src/Context/theme-context'

const HomeScreen = ({ navigation }) => {
   return (
      <ThemeContext.Consumer>
         {(theme) => {
            return (
               <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
                  <ImageBackground style={{ height: 100, justifyContent: 'flex-end', margin: 5 }} source={{ uri: 'https://image.freepik.com/free-vector/abstract-technology-particle-background_52683-25766.jpg' }}>
                     <Text style={{ color: 'white', margin: 5 }}>Welcome to PluralSight!</Text>
                  </ImageBackground>
                  <Text style={{ color: theme.foreground, fontSize: 15, paddingTop: 10, paddingBottom: 20, fontWeight: 'bold',margin: 5 }}>With PluralSight, you can build and apply skills in top technologies.</Text>
                  <View style={{margin: 5}}>
                  <SectionCourses title='Software Development' navigation={navigation} onPress={() => navigation.navigate("ListLesson", { title: 'Software Development' })} />
                  <SectionCourses title='IT operations' navigation={navigation} onPress={() => navigation.navigate("ListLesson", { title: 'IT operations' })} />
                  <SectionCourses title='Data Professional' navigation={navigation} onPress={() => navigation.navigate("ListLesson", { title: 'Data Professional' })} />
                  </View>
               </ScrollView>
            )
         }}
      </ThemeContext.Consumer>
   )
}
const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
})
export default HomeScreen