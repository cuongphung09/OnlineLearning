import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, AsyncStorage } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ThemeContext from "../../Context/theme-context";
import * as FileSystem from 'expo-file-system';
import Youtube from '../../Component/youtube'
import * as ScreenOrientation from 'expo-screen-orientation';
import VideoPlayer from 'expo-video-player'
import { Video } from 'expo-av'
import SectionCoursesItem from '../Home/SectionCoursesItem/section-courses-item'
export default function DownloadScreen({ navigation }) {
  const [data, setData] = useState([])
  const [FScreen, setFScreen] = useState(false)
  useEffect(() => {
    const loadData = async () => {
      // const data = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + 'video')
      // console.log(data)
      // setData(data)
      const data1 = await AsyncStorage.getItem('download')
      setData(JSON.parse(data1).payload)
    }
    loadData()
  }, [])
  return (
    <ThemeContext.Consumer>
      {
        ([theme, setTheme]) => {
          return (
            <View style={{
              backgroundColor: theme.background, alignItems: "center",
              justifyContent: "center",
            }}>
              {data.length === 0 ? (
                <View style={{
                  backgroundColor: theme.background, alignItems: "center",
                  justifyContent: "center",
                }}>
                  <MaterialCommunityIcons name="download" color={theme.foreground} size={200} />
                  <Text style={{ fontSize: 30, fontWeight: 'bold', color: theme.foreground }}>No download</Text>
                  <Text style={{ fontSize: 16, color: theme.foreground }}>Courses you download will appear here</Text>
                </View>
              ) : (
                  <ScrollView style={{}}>
                    {
                      data.map(item => (<SectionCoursesItem item={item} key={item.id} onPress={() => navigation.navigate('CoursesDetail', { item: item })} />))
                    }
                  </ScrollView>
                )}
            </View>
          )
        }
      }
    </ThemeContext.Consumer>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#0E0F13",
    alignItems: "center",
    justifyContent: "center",
  },
});
