import SectionCourses from "./SectionCourses/section-courses"
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ImageBackground, TouchableOpacity, Text, ScrollView, AsyncStorage } from 'react-native'
import ThemeContext from '../../../src/Context/theme-context'
const HomeScreen = ({ navigation }) => {
   const [isLoggedIn, setIsLoggedIn] = useState(false)
   const [token, setToken] = useState('')
   const [userInfo, setUserInfo] = useState()
   const [data, setData] = useState([])
   useEffect(() => {
      async function getCategory() {
         let getCategory = await fetch(`https://api.itedu.me/category/all`, {
            method: 'GET',
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
            },
         })
         let count = 2
         let getCategoryJson = (await getCategory.json())
         let addData = []
         let payload = getCategoryJson.payload
         payload.map(async (element) => {
            element.key = count
            count++
            let demo = await fetch(`https://api.itedu.me/course/search`, {
               method: 'POST',
               headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                  keyword: '',
                  opt: {
                     sort: {
                        attribute: "price",
                        rule: "ASC"
                     },
                     category: [
                        element.id
                     ],
                     time: [
                        {
                           min: 0,
                           max: 1
                        },
                        {
                           min: 3,
                           max: 6
                        }
                     ],
                     price: [
                        {
                           max: 0
                        },
                        {
                           min: 0,
                           max: 200000
                        },
                        {
                           min: 500000,
                           max: 1000000
                        }
                     ]
                  },
                  limit: 10,
                  offset: 1
               })
            })
            let demoJson = await demo.json();

         })
      }
      async function fetchData() {
         const isLoggedInTemp = await AsyncStorage.getItem('isLoggedIn')
         const tokenTemp = await AsyncStorage.getItem('token')

         const userInfoTemp = await AsyncStorage.getItem('userInfo')
         console.log(userInfoTemp)
         setIsLoggedIn(isLoggedInTemp)
         setToken(tokenTemp)
         setUserInfo(userInfoTemp)
         // console.log(tokenTemp)
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
               key: 1,
               id: '',
               name: 'Có thể bạn quan tâm',
               courses: recommendJson.payload
            }
         ]
         setData(dataTemp)
      }
      fetchData()
      getCategory()
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
      // console.log(userInfo)
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