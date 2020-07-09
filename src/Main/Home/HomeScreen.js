import SectionCourses from "./SectionCourses/section-courses"
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ImageBackground, TouchableOpacity, Text, ScrollView, AsyncStorage } from 'react-native'
import headerRight from "../../Component/headerRight"
import ThemeContext from '../../../src/Context/theme-context'
// import homeData from './home-data'
import { render } from "react-dom"
const HomeScreen = ({ navigation }) => {
   const [isLoggedIn, setIsLoggedIn] = useState(false)
   const [token, setToken] = useState('')
   const [userInfo, setUserInfo] = useState()
   const [data, setData] = useState([])
   useEffect(() => {
      async function fetchData() {
         const isLoggedInTemp = await AsyncStorage.getItem('isLoggedIn')
         const tokenTemp = await AsyncStorage.getItem('token')
         const userInfoTemp = await AsyncStorage.getItem('userInfo')
         setIsLoggedIn(isLoggedInTemp)
         setToken(tokenTemp)
         setUserInfo(userInfoTemp)
         // console.log(JSON.parse(userInfoTemp).id)
         let recommend = await fetch(`https://api.itedu.me/user/recommend-course/${JSON.parse(userInfoTemp).id}/10/1`, {
            method: 'GET',
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
            },
         })
         let recommendJson = await recommend.json();
         let dataTemp = [
            {
               id: 1,
               title: 'Có thể bạn quan tâm',
               courses: recommendJson.payload
            }
         ]
         setData(dataTemp)
         let demo = await fetch(`https://api.itedu.me/course/detail-with-lesson/b5a93098-3936-4b22-9188-271bd909ebbf`, {
            method: 'GET',
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
               Authorization: `Bearer  ${tokenTemp}`,
            },
         })
         let demoJson = await demo.json();
         console.log(demoJson)

      }
      fetchData()

   }, []);
   // const data = homeData
   const renderData = (data) => {
      return data.map(item => <SectionCourses key={item.id}
         title={item.title}
         data={item.courses}
         navigation={navigation} onPress={() => navigation.navigate("ListLesson", {
            title: item.title
            , data: item.courses
         })} />)
   }
   return (
      <ThemeContext.Consumer>
         {([theme, setTheme]) => {
            // console.log(data)
            return (
               <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
                  <ImageBackground style={{ height: 100, justifyContent: 'flex-end', margin: 5 }} source={{ uri: 'https://image.freepik.com/free-vector/abstract-technology-particle-background_52683-25766.jpg' }}>
                     <Text style={{ color: 'white', margin: 5 }}>Chào mừng đến với ITEDU!</Text>
                  </ImageBackground>
                  <Text style={{ color: theme.foreground, fontSize: 15, paddingTop: 10, paddingBottom: 20, fontWeight: 'bold', margin: 5 }}>Những khóa học mới được cập nhật thường xuyên</Text>
                  <View style={{ margin: 5 }}>
                     {renderData(data)}
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