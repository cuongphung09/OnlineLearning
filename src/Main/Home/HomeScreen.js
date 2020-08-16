import SectionCourses from "./SectionCourses/section-courses"
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ImageBackground, Text, ScrollView, AsyncStorage } from 'react-native'
import ThemeContext from '../../../src/Context/theme-context'
import { REST_API } from "../../../config/api"
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
         const recommend = await REST_API.getRecommendCourse()
         const favoriteInfo = JSON.stringify({
            userId: JSON.parse(userInfoTemp).id
         })
         const favorite = await REST_API.getFavoriteCourse(favoriteInfo)
         const newInfo = JSON.stringify({
            limit: 10,
            page: 1
         })
         const newCourse = await REST_API.getNewestCourse(newInfo)
         const topCourse = await REST_API.getTopCourse(newInfo)
         const learningCourse = await REST_API.getProcessCourses()
         const favCourse = await REST_API.getFavCourses()
         let dataTemp = [
            {
               key: 1,
               id: '',
               name: 'Khóa học gợi ý cho bạn',
               courses: recommend.payload
            },
            {
               key: 2,
               id: '',
               name: 'Khóa học của tôi',
               courses: favorite.payload ? favorite.payload : []
            },
            {
               key: 3,
               id: '',
               name: 'Khóa học mới nhất',
               courses: newCourse.payload ? newCourse.payload : []
            },
            {
               key: 4,
               id: '',
               name: 'Khóa học nổi bật',
               courses: topCourse.payload ? topCourse.payload : []
            },
            {
               key: 5,
               id: '',
               name: 'Khóa học đang học',
               courses: learningCourse.payload ? learningCourse.payload : []
            },
            {
               key: 6,
               id: '',
               name: 'Khóa học yêu thích',
               courses: favCourse.payload ? favCourse.payload : []
            }
         ]
         setData(dataTemp)
      }
      fetchData()
   }, []);
   const renderData = (data) => {
      return data.map(item => <SectionCourses key={item.key}
         name={item.name}
         data={item.courses}
         navigation={navigation} onPress={() => navigation.navigate("ListCourses", {
            name: item.name
            , data: item.courses
         })} />)
   }
   const getUser = async () => {
      const tokenTemp = await AsyncStorage.getItem('token')
      let get = await fetch('https://api.itedu.me/user/me', {
         method: 'GET',
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokenTemp}`,
         },
      })
      let userInfo = await get.json()
   }

   return (
      <ThemeContext.Consumer>
         {([theme, setTheme]) => {
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